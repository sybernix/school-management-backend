const socketEvents = require("../utils/socket_events");
const MongoClient = require('mongodb').MongoClient;
const configs = require("../config/config.json");

module.exports = (io, socket) => {
	socket.on(socketEvents.JOIN_USER, async (user) => {
		console.log("Reached joined  user socket");
		console.log("Client Socket ID : " + socket.id);
		console.log(user);

		MongoClient.connect(configs.MONGO_URI, function(err, db) {
			if (err) throw err;
			const dbo = db.db(configs.MONGO_DB_NAME);
			const query = {receiver: user.userId};
			dbo.collection(configs.CHAT_MESSAGES_COLLECTION_NAME).find(query).toArray(function(err, result) {
				if (err) throw err;
				socket.emit("received messages", result);
				console.log(result);
				// io.in(socket.id).emit("received messages", result);
				db.close();
			});
		});
	});
};
