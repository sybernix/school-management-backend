const mongoose = require("mongoose");
const constants = require("../utils/constants");

const schema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        required: true
    }
});

const tokenSchema = mongoose.model(constants.TOKEN_COLLECTION_NAME, schema);
module.exports = tokenSchema;
