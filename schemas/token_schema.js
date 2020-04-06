const mongoose = require("mongoose");
const constants = require("../utils/constants");

const schema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    }
});

const tokenSchema = mongoose.model(constants.AUTH_COLLECTION_NAME, schema);
module.exports = tokenSchema;
