const User = require('../schemas/chat_user_schema');
const socketEvents = require("../utils/socket_events");

module.exports = (io, socket) => {
	socket.on(socketEvents.JOIN_USER, async (user) => {
		console.log("Reached joined  user socket");
		console.log("Client Socket ID : " + socket.id);
		console.log(user);
		// add user to db
		const onlineUser = new User({ socketId: socket.id, nickname: user.nickname });
		await onlineUser.save();
		console.log("Saved new chat user");

		// get online users
		const onlineUsers = await User.find({})
			.where('_id').ne(onlineUser._id);

		// send to current request socket client
		socket.emit('user joined', {
			onlineUsers,
		});

		// sending to all clients except sender
		socket.broadcast.emit('new online user', onlineUser);
	});
};
