const User = require('../schemas/chat_user_schema');
const socketEvents = require("../utils/socket_events");

module.exports = (io, socket) => {
    socket.on(socketEvents.CHAT_MESSAGE, async (msg) => {
        const user = await User.findOne({ socketId: socket.id });
        io.emit('chat message', { nickname: user.nickname, message: msg.message });
    });
};
