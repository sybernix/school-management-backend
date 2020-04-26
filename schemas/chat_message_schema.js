const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constants = require("../utils/constants");

const chatMessageSchema = new Schema({
    sender: {type: String, required: true},
    receiver: {type: String, required: true},
    message: {type: String, required: true},
    sent_time: {type: String}
});

module.exports = mongoose.model(constants.CHAT_MESSAGES_COLLECTION_NAME, chatMessageSchema);
