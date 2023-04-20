const mongoose = require("mongoose")

const bookmarkSchema = mongoose.Schema(
    {
        user: {
            ref: "User",
            type: mongoose.Types.ObjectId,
        },
        post: {
            ref: "Post",
            type: mongoose.Types.ObjectId,
        },
    },

    { timestamps: true }
)

const Bookmark = mongoose.model("Bookmark", bookmarkSchema)
module.exports = Bookmark
