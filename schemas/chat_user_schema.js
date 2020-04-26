const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constants = require("../utils/constants");

const chatUserSchema = new Schema({
    socket_id: {type: String, required: true},
    nickname: String,
});

module.exports = mongoose.model(constants.CHAT_ONLINE_USERS_COLLECTION_NAME, chatUserSchema);
