const mongoose = require("mongoose")

const postLikeSchema = mongoose.Schema(
    {
        post_id: {
            $ref: "posts",
            $id: mongoose.Types.ObjectId,
        },
        count: Number,
        likes: [
            {
                $ref: "users",
                $id: mongoose.Types.ObjectId,
            },
        ],
    },
    { timestamps: true }
)

const PostLike = mongoose.model("PostLike", postLikeSchema)
module.exports = PostLike
