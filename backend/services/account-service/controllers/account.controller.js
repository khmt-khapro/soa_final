const User = require("../models/user.model.js")
const crypto = require("crypto")
const BaseError = require("../utils/error-handling/baseError.js")
const { genJwtToken } = require("../utils/generateToken.js")
const { sendMessageAMQP } = require("./rabbitmq.js")

// -----------------------CREATE NEW USER-----------------------------------
const signup = async (req, res, next) => {
  try {
    const { username, email, password, fullname } = req.body

    // find if user exist
    const isExist = await User.findOne({ email })
    if (isExist) {
      return next(
        new BaseError(400, "This email has been used. Please use another email")
      )
    }

    // create new user
    const newUser = new User({ username, email, password, fullname })
    await newUser.save()

    //  create activate token
    const activateToken = genJwtToken(
      { id: newUser.id },
      "activateToken",
      "10m"
    )

    // response create account success
    res.status(200).json({
      status: "succes",
      message:
        "Create account succesfully, check your email to activate account",
    })

    // message broker sendmail
    sendMessageAMQP({
      message: {
        type: "activate_account",
        recipient: email,
        activateToken,
      },
      queueName: "email_queue",
    })
  } catch (error) {
    next(new BaseError(500, error.message))
  }
}

//  --------------------- ACTIVATE ACCOUNT ------------------------------
const activateAccount = async (req, res, next) => {
  try {
    const { id } = req.user
    const user = await User.findById(id)

    // check if already activated
    if (user.status === "activated") {
      return new (BaseError(400, "The link has been expire"))()
    }

    // activate
    user.status = "activated"
    await user.save()

    res.status(201).json({
      status: "succes",
      message: "Your account has been activated, now can login",
    })
  } catch (error) {
    next(new BaseError(500, error.message))
  }
}

// ------------------- SIGNIN -------------------------------
const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select(
      "+password -createdAt -updatedAt -__v"
    )
    if (!user) {
      return next(new BaseError(401, "Incorrect email, try  again"))
    }

    const isValid = user.verifyPassword(password, user.password)
    if (!isValid) {
      return next(new BaseError(401, "Incorrect password, try  again"))
    }

    // check accoutn state
    if (user.status === "pending") {
      return next(new BaseError(401, "Please active your account first"))
    }

    // hide field in response
    user.password = undefined
    user.status = undefined

    const accessToken = genJwtToken({ id: user.id }, "accessToken", "1h")

    res
      .status(200)
      .json({ status: "succes", data: { ...user._doc, accessToken } })
  } catch (error) {
    next(new BaseError(500, error.message))
  }
}

const FORGOT_PASSWORD = async (req, res, next) => {
  const { value, error } = JoiValidate.forgotPassword.validate(req.body)
  if (error) {
    return next(new appError(error.message, 400))
  }

  const user = await User.findOne({ email: value.email })
  if (!user) {
    return next(new appError("There is no user with this email", 400))
  }

  const resetToken = user.createPasswordResetToken()
  await user.save({ validateBeforeSave: false })
  const resetURL = `http://localhost:3000/resetPassword/${resetToken}`

  try {
    await SEND_MAIL(email, resetURL)
    res.status(200).json({ status: "success", message: "email was sent" })
  } catch (error) {
    user.passwordResetToken = undefined
    user.passwordResetExpire = undefined
    user.save({ validateBeforeSave: false })
    return next(new appError("There is an error when send email", 500))
  }
}

const RESET_PASSWORD = async (req, res, next) => {
  const { token } = req.params
  const { value, error } = JoiValidate.resetPassword.validate(req.body)
  const { password, passwordConfirm } = value
  if (!token) {
    return next(new appError("There is no token", 400))
  }

  if (error) {
    return next(new appError(error.message, 400))
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex")
  const user = await User.findOne({ passwordResetToken: hashedToken })
  if (!user) {
    return next(new appError("Invalid token", 400))
  }

  if (user.passwordResetExpire < Date.now())
    return next(new appError("Token has been expired", 400))

  // all right, update user password
  user.password = password
  user.passwordConfirm = passwordConfirm
  user.passwordResetToken = undefined
  user.passwordResetExpire = undefined
  await user.save()
  const jwtToken = generateToken(user._id, user.isAdmin)
  res.status(200).json({ status: "succes", token: jwtToken })
}

const UPDATE_PASSWORD = async (req, res, next) => {
  const { value, error } = JoiValidate.updatePassword.validate(req.body)
  if (error) {
    return next(new appError(error.message, 400))
  }

  const { currentPassword, password, passwordConfirm } = value
  // find user by id from auth middleware
  const user = await User.findById(req.user.id).select("+password")
  // check if user request current pass are correct
  const correctPass = await user.verifyPassword(currentPassword, user.password)
  if (!correctPass) {
    return next(new appError("Your current password are incorrect", 401))
  }

  // if true, then change the password
  // dont use findByIdAndUpdate because methods in model not run !!!
  user.password = password
  user.passwordConfirm = passwordConfirm
  await user.save()

  // create token and log user in
  const jwtToken = generateToken(user._id, user.isAdmin)
  res.status(200).json({ status: "success", token: jwtToken })
}

//  const UPDATE_PROFILE = async (req, res, next) => {
//   const { value, error } = updateProfileSchema.validate(req.body);
//   if (error) {
//     return next(new appError(error.message, 400));
//   }

//   const updatedUser = await User.findByIdAndUpdate(req.user.id, value, {
//     new: true,
//     runValidators: true,
//   });
//   res.status(200).json({ status: "success", data: { user: updatedUser } });
// };

module.exports = {
  signup,
  signin,
  activateAccount,
}
