const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const configs = require("../config/config.json");

const chatUserSchema = new Schema({
    socketId: {type: String, required: true},
    nickname: String,
});

module.exports = mongoose.model(configs.CHAT_ONLINE_USERS_COLLECTION_NAME, chatUserSchema);
