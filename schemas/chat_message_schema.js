const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const configs = require("../config/config.json");

const chatMessageSchema = new Schema({
    sender: {type: String, required: true},
    receiver: {type: String, required: true},
    message: {type: String, required: true},
    sentTime: {type: String}
});

module.exports = mongoose.model(configs.CHAT_MESSAGES_COLLECTION_NAME, chatMessageSchema);
