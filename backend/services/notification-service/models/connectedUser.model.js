const mongoose = require("mongoose")

const connectedUserSchema = mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        socketID: {
            type: String,
        },
    },
    { timestamps: true }
)

const ConnectedUser = mongoose.model("ConnectedUser", connectedUserSchema)
module.exports = ConnectedUser
