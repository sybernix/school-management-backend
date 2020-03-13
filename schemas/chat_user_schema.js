const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatUserSchema = new Schema({
    socketId: {type: String, required: true},
    nickname: String,
});

module.exports = mongoose.model('user', chatUserSchema);