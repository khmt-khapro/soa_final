const mongoose = require("mongoose")

const postSchema = mongoose.Schema(
    {
        author: {
            ref: "User",
            type: mongoose.Types.ObjectId,
        },
        title: String,
        content: String, // html content
        // image: String,
        tags: [
            {
                ref: "Tag",
                type: mongoose.Types.ObjectId,
            },
        ],
        privacy: {
            type: String,
            enum: ["public", "onlyMe"],
            default: "public",
        },
        time_to_read: Number,
        count: Number,
        likes: [
            {
                ref: "User",
                type: mongoose.Types.ObjectId,
            },
        ],
    },

    { timestamps: true }
)

const Post = mongoose.model("Post", postSchema)
module.exports = Post
