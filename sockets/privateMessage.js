const User = require('../schemas/chat_user_schema');
const Room = require('../schemas/chat_room_schema');

module.exports = (io, socket) => {
	socket.on('send private message', async (msg) => {
		const emitterUser = await User.findOne({ socketId: socket.id });
		const receiverUser = await User.findById(msg.receiverId);

		const messageToReceiver = {
			emitterSocketId: socket.id,
			emitterId: emitterUser._id,
			receiverId: receiverUser._id,
			nickname: emitterUser.nickname,
			message: msg.message,
		};

		const alreadyInRoom = await Room.find({
			users: {
				$all: [emitterUser._id, receiverUser._id]
			}
		});

		if (alreadyInRoom.length) {
			io.in(alreadyInRoom[0]._id).clients((error, clients) => {
				// if user is not inside the room yet
				if (clients.every(x => String(x) !== String(receiverUser.socketId))) {
					// sending to individual socketid (private message)
					io.to(receiverUser.socketId).emit('receive private message', messageToReceiver);
				}

				// sending to all clients inside the room, including sender
				io.in(alreadyInRoom[0]._id).emit('receive private message', messageToReceiver);
			});
		}
	});
};
