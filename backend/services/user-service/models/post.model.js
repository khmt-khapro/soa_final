const mongoose = require("mongoose")

const postSchema = mongoose.Schema(
    {
        author: {
            $ref: "users",
            $id: mongoose.Types.ObjectId,
        },
        title: String,
        content: String, // html content
        // image: String,
        tags: [
            {
                $ref: "tags",
                $id: mongoose.Types.ObjectId,
            },
        ],
        privacy: {
            type: String,
            enum: ["public", "onlyMe"],
            default: "public",
        },
        time_to_read: Number,
    },

    { timestamps: true }
)

const Post = mongoose.model("Post", postSchema)
module.exports = Post
