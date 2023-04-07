const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    author: {
      $ref: "users",
      $id: mongoose.Types.ObjectId,
    },
    post_id: String,
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

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
