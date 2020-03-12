const User = require('../../schemas/chat_user_schema');

module.exports = (io, socket) => {
    socket.on('disconnect', async () => {
				const userToRemove = await User.findOne({ socketId: socket.id });
        await User.findOneAndRemove({ socketId: socket.id });

        io.emit('disconnected user', { userId: userToRemove._id });
    });
};