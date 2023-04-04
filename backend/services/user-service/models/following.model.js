const mongoose = require("mongoose");

const followingSchema = mongoose.Schema(
  {
    user_id: String,
    follows: [
      {
        $ref: "users",
        $id: mongoose.Types.ObjectId,
      },
    ],
  },
  { timestamps: true }
);

const Following = mongoose.model("Followings", followingSchema);
module.exports = Following;

// {
//     id: 123,
//     page:1,
//     count: 10,
//     follows: [
//         123,
//         456
//     ]
// }
