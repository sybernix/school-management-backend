const User = require('../schemas/chat_user_schema');
const socketEvents = require("../utils/socket_events");

module.exports = (io, socket) => {
    socket.on(socketEvents.DISCONNECT, async () => {
        console.log("Chat socket with ID " + socket.id + "disconnected from server");
		// 		const userToRemove = await User.findOne({ socketId: socket.id });
        // await User.findOneAndRemove({ socketId: socket.id });
        // io.emit('disconnected user', { userId: userToRemove._id });
        // io.emit('disconnected');
    });
};
