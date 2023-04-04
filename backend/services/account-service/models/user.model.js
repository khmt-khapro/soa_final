const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
    refresh_token: String,
    reset_password_at: Date,
    fullname: String,
    bio: String,
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/khait/image/upload/v1680667931/forum_user_avatar/user_s80crg.png",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    dob: String,
    address: String,
    job: String,
    status: {
      type: String,
      enum: ["pending", "activated", "disabled"],
      default: "pending",
    },
  },
  { timestamps: true }
)

userSchema.pre("save", function (next) {
  // Only run this function if password was moddified (not on other update functions)
  if (!this.isModified("password")) return next()
  // Hash password with strength of 12
  this.password = bcrypt.hashSync(this.password, 12)
  next()
})

//  run on password changed
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next()
  this.passwordChangeAt = Date.now() - 1000
  next()
})

// method check password valid
userSchema.methods.verifyPassword = function (inputPass, userPass) {
  return bcrypt.compareSync(inputPass, userPass)
}

const User = mongoose.model("Users", userSchema)
module.exports = User
