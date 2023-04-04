const mongoose = require("mongoose");

const postLikeSchema = mongoose.Schema(
  {
    post_id: String,
    count: Number,
    likes: [
      {
        $ref: "users",
        $id: mongoose.Types.ObjectId,
      },
    ],
  },
  { timestamps: true }
);

const PostLike = mongoose.model("PostLikes", postLikeSchema);
module.exports = PostLike;
