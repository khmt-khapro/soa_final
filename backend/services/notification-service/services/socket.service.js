const ConnectedUser = require("../models/connectedUser.model")

class SocketServices {
    // connection socket
    connection(socket) {
        socket.on("disconnect", async () => {
            console.log(`>>>>> A user has socket ID: ${socket.id} disconnected`)
            // remove socket id from database
            await ConnectedUser.findOneAndDelete({ socketID: socket.id })
        })

        // when user connected to socket server, insert socket id, userID to database
        socket.on("user_connect", async (msg) => {
            const { userID, socketID } = msg
            await ConnectedUser.create({
                userID,
                socketID,
            })
        })
    }
}

module.exports = new SocketServices()
