const mongoose = require("mongoose");
const configs = require("../config/config.json");

const schema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    }
});

const authSchema = mongoose.model(configs.AUTH_COLLECTION_NAME, schema);
module.exports = authSchema;
