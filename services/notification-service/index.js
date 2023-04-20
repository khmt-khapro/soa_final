const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const BaseError = require("./utils/error-handling/baseError")
const SocketService = require("./services/socket.service")
const NotificationService = require("./services/notification.service")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 5003

// socket io
const http = require("http").Server(app)
const io = require("socket.io")(http, {
    cors: {
        origin: "*",
    },
})

global._io = io
global._io.on("connection", SocketService.connection)

app.use(bodyParser.json({ limit: "10mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }))
app.use(cors())

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
    })
    .then(() => {
        console.log("<<<<< Connected to database")
    })
    .catch((err) => {
        console.log("🚀 ~ file: index.js:38 ~ err:", err)
    })

app.listen(PORT, () => {
    console.log(`>>>>> Notification service is running on port ${PORT}.`)
    NotificationService.run()
})

// Catch All Unhandled Promise Rejections
process.on("unhandledRejection", (error) => {
    throw error
})

// Catch All Uncaught Exceptions
process.on("uncaughtException", (error) => {
    console.log("🚀 ~ file: index.js:43 ~ process.on ~ error:", error)

    if (!(error instanceof BaseError)) {
        process.exit(1)
    }
})
