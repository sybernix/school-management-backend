const User = require('../../schemas/chat_user_schema');
const Room = require('../../schemas/chat_room_schema');

module.exports = (io, socket) => {
	socket.on('join private room', async (data) => {
		const emitterUser = await User.findOne({ socketId: socket.id });
		const receiverUser = await User.findById(data.receiverId);

		const alreadyInRoom = await Room.find({
			users: {
				$all: [emitterUser._id, receiverUser._id]
			}
		});

		if (alreadyInRoom.length) {
			io.in(alreadyInRoom[0]._id).clients((error, clients) => {
				// if user is not inside the room yet
				if (clients.every(x => String(x) !== String(socket.id))) {
					socket.join(alreadyInRoom[0]._id);
				}
			});
		} else {
			const newRoom = new Room({ users: [emitterUser._id, receiverUser._id] });
			await newRoom.save();

			socket.join(newRoom._id);
		}
	});
}