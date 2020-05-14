const socketEvents = require("../utils/socket_events");
const MongoClient = require('mongodb').MongoClient;
const chatMessageSchema = require("../schemas/chat_message_schema");
const configs = require("../config/config.json");

module.exports = (io, socket) => {
	socket.on(socketEvents.JOIN_USER, async (user) => {
		console.log("Reached joined  user socket");
		console.log("Client Socket ID : " + socket.id);
		console.log(user);

		const query = {receiver: user.userId};
		chatMessageSchema
			.find(query)
			.exec()
			.then((resultList) => {
				if (resultList) {
					socket.emit("received messages", resultList);
					console.log(resultList);
				}
			});
		// chatMessageSchema.find(query).toArray(function(err, result) {
		// 	if (err) throw err;
		// 	socket.emit("received messages", result);
		// 	console.log(result);
		// 	// io.in(socket.id).emit("received messages", result);
		// 	db.close();
		// });

		// MongoClient.connect(configs.MONGO_URI, function(err, db) {
		// 	if (err) throw err;
		// 	// const dbo = db.db(configs.MONGO_DB_NAME);
		//
		//
		// });
	});
};
