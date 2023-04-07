const mongoose = require("mongoose");

const commentReplySchema = mongoose.Schema(
  {
    comment_id: String,
    author: {
      $ref: "users",
      $id: mongoose.Types.ObjectId,
    },
    content: String,
    like_count: Number,
    likes: [
      {
        $ref: "users",
        $id: mongoose.Types.ObjectId,
      },
    ],
  },
  { timestamps: true }
);

const CommentReply = mongoose.model("CommentReply", commentReplySchema);
module.exports = CommentReply;
