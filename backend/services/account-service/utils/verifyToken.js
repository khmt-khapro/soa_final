const BaseError = require("./error-handling/baseError")
const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
  const secret = process.env.ACCESS_TOKEN_SECRET

  if (!req.headers.authorization) {
    next(
      new BaseError("unauthentication", 401, true, "You are unauthentication")
    )
  }

  const token = req.headers.authorization.split(" ")[1]

  jwt.verify(token, secret, (err, payload) => {
    if (err) {
      next(new BaseError(401, true, "Invalid token"))
    }

    req.user = payload
    next()
  })
}

const verifyRole = () => {
  return (req, res, next) => {
    if (!req.user.role)
      return next(
        new BaseError(
          "unauthentication",
          401,
          true,
          "You don't have permission"
        )
      )

    next()
  }
}

module.exports = { verifyToken, verifyRole }
