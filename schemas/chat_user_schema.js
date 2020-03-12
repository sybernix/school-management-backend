var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var chatUserSchema = new Schema({
    socketId:  { type: String, required: true },
    nickname: String,
});

module.exports = mongoose.model('user', chatUserSchema);