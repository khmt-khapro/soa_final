const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    author: {
      $ref: "users",
      $id: mongoose.Types.ObjectId,
    },
    content: String,
    image: String,
    privacy: {
      type: String,
      enum: ["public", "onlyMe"],
    },
  },

  { timestamps: true }
);

const Post = mongoose.model("Posts", postSchema);
module.exports = Post;
