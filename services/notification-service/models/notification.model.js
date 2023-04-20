const mongoose = require("mongoose")

const notificationSchema = mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["like_post", "comment", "like_comment", "reply_comment", "follow"],
            required: true,
        },
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
        comment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
        isRead: {
            type: Boolean,
            default: false,
        },
        message: {
            type: String,
        },
    },
    { timestamps: true }
)

const Notification = mongoose.model("Notification", notificationSchema)
module.exports = Notification
