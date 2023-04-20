const { isCelebrateError } = require("celebrate")
const BaseError = require("../utils/error-handling/baseError")

const handleCastErrorDB = (error) => {
    const message = `Invalid ${error.path}: ${error.value}`
    return new BaseError(400, message)
}

const handleDuplicateField = (error) => {
    const message = `${JSON.stringify(error.keyValue).replace(
        /[^a-zA-Z0-9: ]/g,
        ""
    )} already registered, please try another!`
    return new BaseError(400, message)
}

const handleToken = (error, type) => {
    let message
    if (type == "invalid") message = "Invalid token"
    if (type == "expire") message = "Token has expire, please login again"
    return new BaseError(403, message)
}

const developmentError = (err, res) => {
    console.log("🚀 ~ file: error.middleware.js:24 ~ developmentError ~ err:", err)

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        // error: err,
        stack: err.stack,
    })
}

const productionError = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        })
    } else {
        console.error("ERROR >>>>>>>>", err)
        res.status(500).json({
            status: "error",
            message: "Something went wrong !!!",
        })
    }
}

const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || "error"

    let error = err
    console.log("🚀 ~ file: error.middleware.js:55 ~ errorMiddleware ~ error:", error)
    if (error.name == "CastError") error = handleCastErrorDB(error)
    if (error.code == 11000) error = handleDuplicateField(error)
    if (error.name == "JsonWebTokenError") error = handleToken(error, "invalid")
    if (error.name == "TokenExpiredError") error = handleToken(error, "expire")
    if (isCelebrateError(err)) {
        err.message = err.details.get("body").details[0].message
        err.statusCode = 400
    }
    developmentError(error, res)
    // if (process.env.NODE_ENV == "development") {
    //     developmentError(err, res)
    // } else {
    //     let error = err
    //     if (error.name == "CastError") error = handleCastErrorDB(error)
    //     if (error.code == 11000) error = handleDuplicateField(error)
    //     if (error.name == "JsonWebTokenError") error = handleToken(error, "invalid")
    //     if (error.name == "TokenExpiredError") error = handleToken(error, "expire")
    //     if (isCelebrateError(err)) {
    //         console.log("🚀 ~ file: error.middleware.js:62 ~ errorMiddleware ~ err:", err)
    //     }
    //     productionError(error, res)
    // }
}

module.exports = errorMiddleware
