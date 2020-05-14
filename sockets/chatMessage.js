const socketEvents = require("../utils/socket_events");
const chatMessageSchema = require("../schemas/chat_message_schema");
const mongoose = require("mongoose");

module.exports = (io, socket) => {
    var clients = [];

    socket.on(socketEvents.CHAT_MESSAGE, async (messageFromClientToServer) => {
        if (clients.indexOf(messageFromClientToServer.receiver) > -1) {
            socket.emit(messageFromClientToServer.receiver, messageFromClientToServer)
        }

        const newMessage = new chatMessageSchema({
            _id: mongoose.Types.ObjectId(),
            sender: messageFromClientToServer.sender,
            receiver: messageFromClientToServer.receiver,
            message: messageFromClientToServer.message
        });
        newMessage.save();
        console.log("New message saved")
    });

    socket.on(socketEvents.JOIN_USER, async (user) => {
        console.log("Reached joined  user socket");
        console.log("Client Socket ID : " + socket.id);
        console.log(user);
        clients.push(user.userId);

        const query = {receiver: user.userId};
        chatMessageSchema
            .find(query)
            .exec()
            .then((resultList) => {
                if (resultList) {
                    socket.emit(user.userId, resultList);
                    console.log(resultList);
                }
            });
    });

    socket.on(socketEvents.DISCONNECT, async (user) => {
        const index = clients.indexOf(user.userId);
        if (index > -1) {
            clients.splice(index, 1);
        }
        console.log("Chat socket with ID " + socket.id + "disconnected from server");

    });
};
