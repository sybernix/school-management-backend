const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatRoomSchema = new Schema({
	users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('room', chatRoomSchema);