const mongoose = require("mongoose");

const tagSchema = mongoose.Schema(
  {
    name: String, //nodejs, reactjs, ...
    count_following: Number,
    count_post: Number,
    description: String,
  },
  { timestamps: true }
);

const Tag = mongoose.model("Tag", tagSchema);
module.exports = Tag;
