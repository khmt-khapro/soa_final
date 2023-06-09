const userRoute = require("./user.route")
const postRoute = require("./post.route")
const createError = require("../utils/error-handling/createError")
const errorMiddleware = require("../middlewares/error.middleware")

const initRoute = (app) => {
    app.use("/api/users", userRoute)
    app.use("/api/posts", postRoute)
    // app.use("/api/upload", uploadRoute);

    app.use("*", (req, res, next) => {
        const message = `Cant not find ${req.originalUrl}`
        next(new createError.NotFound({ message }))
    })

    app.use(errorMiddleware)
}

module.exports = initRoute
