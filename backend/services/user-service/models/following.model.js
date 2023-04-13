const mongoose = require("mongoose")

const followingSchema = mongoose.Schema(
    {
        user_id: String,
        follows: [
            {
                ref: "User",
                type: mongoose.Types.ObjectId,
            },
        ],
    },
    { timestamps: true }
)

const Following = mongoose.model("Following", followingSchema)
module.exports = Following

// {
//     id: 123,
//     page:1,
//     count: 10,
//     follows: [
//         123,
//         456
//     ]
// }
