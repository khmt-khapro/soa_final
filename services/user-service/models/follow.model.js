const mongoose = require("mongoose")

const followSchema = mongoose.Schema(
    {
        follower_id: {
            ref: "User",
            type: mongoose.Types.ObjectId,
        },
        following_id: {
            ref: "User",
            type: mongoose.Types.ObjectId,
        },
    },
    { timestamps: true }
)

const Follow = mongoose.model("Follow", followSchema)
module.exports = Follow
