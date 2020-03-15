const socketEvents = require("../utils/socket_events");
const chatMessageSchema = require("../schemas/chat_message_schema");
const mongoose = require("mongoose");

module.exports = (io, socket) => {
    socket.on(socketEvents.CHAT_MESSAGE, async (messageFromClientToServer) => {
        const newMessage = new chatMessageSchema({
            _id: mongoose.Types.ObjectId(),
            sender: messageFromClientToServer.sender,
            receiver: messageFromClientToServer.receiver,
            message: messageFromClientToServer.message
        });
        newMessage.save();
        console.log("New message saved")
    });
};
