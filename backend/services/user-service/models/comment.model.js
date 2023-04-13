const mongoose = require("mongoose")

const commentSchema = mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["comment", "reply"],
            default: "comment",
        },
        parent: {
            ref: "Comment",
            type: mongoose.Types.ObjectId,
        },
        author: {
            ref: "User",
            type: mongoose.Types.ObjectId,
        },
        post_id: String,
        content: String,
        like_count: {
            type: Number,
            default: 0,
        },
        likes: [
            {
                ref: "User",
                type: mongoose.Types.ObjectId,
            },
        ],
    },
    { timestamps: true }
)

commentSchema.pre("remove", async function (next) {
    // Kiểm tra xem comment đang được xóa có phải là parent hay không
    if (this.type === "comment") {
        // Tìm và xóa tất cả các comment children
        await this.model.deleteMany({ parent: this._id })
    }
    next()
})

const Comment = mongoose.model("Comment", commentSchema)
module.exports = Comment
