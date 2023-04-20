const accountRoute = require("./account.route")
const createError = require("../utils/error-handling/createError")
const errorMiddleware = require("../middlewares/error.middleware")

const initRoute = (app) => {
    app.use("/api/account", accountRoute)
    // app.use("/api/post", postRoute);
    // app.use("/api/upload", uploadRoute);

    app.use("*", (req, res, next) => {
        const message = `Cant not find ${req.originalUrl}`
        next(new createError.NotFound({ message }))
    })

    app.use(errorMiddleware)
}

module.exports = initRoute
