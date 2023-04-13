const mongoose = require("mongoose")

const followedSchema = mongoose.Schema(
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

const Followed = mongoose.model("Followed", followedSchema)
module.exports = Followed
