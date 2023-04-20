const mongoose = require("mongoose")

const followingSchema = mongoose.Schema(
    {
        user: {
            ref: "User",
            type: mongoose.Types.ObjectId,
        },
        following_user: {
            ref: "User",
            type: mongoose.Types.ObjectId,
        },
    },
    { timestamps: true }
)

const Following = mongoose.model("Following", followingSchema)
module.exports = Following
