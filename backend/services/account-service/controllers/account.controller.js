const User = require("../models/user.model.js")
const BaseError = require("../utils/error-handling/baseError.js")
const { genJwtToken } = require("../utils/generateToken.js")
const { sendMessageAMQP } = require("./rabbitmq.js")
const crypto = require("crypto")

// -----------------------CREATE NEW USER-----------------------------------
const signup = async (req, res, next) => {
    try {
        const { username, email, password, fullname } = req.body

        // find if user exist
        const isExist = await User.findOne({ email })
        if (isExist) {
            return next(new BaseError(400, "This email has been used. Please use another email"))
        }

        // create new user
        const newUser = new User({
            username,
            email,
            password,
            fullname,
        })
        //  create activate token
        const activateToken = newUser.createHashToken("activateToken")
        await newUser.save({ validateBeforeSave: false })

        // response create account success
        res.status(200).json({
            status: "succes",
            message: "Create account succesfully, check your email to activate account",
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
        const { token } = req.body
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex")
        const user = await User.findOne({ activate_token: hashedToken })

        if (!user) {
            return next(new BaseError(400, "The token provided is invalid"))
        }

        if (user.activate_token_expire < Date.now()) {
            return next(new BaseError(400, "The token has been expire"))
        }

        // check if already activated
        if (user.status === "activated") {
            return next(new BaseError(401, "Forbiden action"))
        }

        // activate & del token
        user.status = "activated"
        user.activate_token = undefined
        user.activate_token_expire = undefined
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
        const user = await User.findOne({ email }).select("+password -createdAt -updatedAt -__v")
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

        // hide fields in response
        user.password = undefined
        user.status = undefined

        const accessToken = genJwtToken({ id: user.id }, "accessToken", "1h")

        res.status(200).json({
            status: "succes",
            data: { ...user._doc, accessToken },
        })
    } catch (error) {
        next(new BaseError(500, error.message))
    }
}

// ----------------------- FORGOT PASSWORD ------------------------------------------
const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return next(new appError("The user is not exist", 400))
        }

        const resetToken = user.createHashToken("resetToken")
        await user.save()

        res.status(200).json({
            status: "succes",
            message: "Check your email to create new password",
            resetToken, // just for postman testing, then remove
        })

        // message broker sendmail
        sendMessageAMQP({
            message: {
                type: "reset_password",
                recipient: email,
                resetToken,
            },
            queueName: "email_queue",
        })
    } catch (error) {
        next(new BaseError(500, error.message))
    }
}

const createNewPassword = async (req, res, next) => {
    try {
        const { password, token } = req.body
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex")
        const user = await User.findOne({ reset_pwd_token: hashedToken })

        if (!user) {
            return next(new BaseError(400, "The token provided is invalid"))
        }

        if (user.reset_pwd_token_expire < Date.now()) {
            return next(new BaseError(400, "The token has been expire"))
        }

        // all right, update user password
        user.password = password
        user.reset_pwd_token = undefined
        user.reset_pwd_token_expire = undefined
        await user.save()

        res.status(200).json({
            status: "succes",
            message: "Your new password has been created, now can signin",
        })
    } catch (error) {
        next(new BaseError(500, error.message))
    }
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
    forgotPassword,
    createNewPassword,
}
