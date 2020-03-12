const User = require('../../schemas/chat_user_schema');

module.exports = (io, socket) => {
    socket.on('chat message', async (msg) => {
        const user = await User.findOne({ socketId: socket.id });

        io.emit('chat message', { nickname: user.nickname, message: msg.message });
    });
};