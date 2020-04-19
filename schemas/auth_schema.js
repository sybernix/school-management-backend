const mongoose = require("mongoose");
const constants = require("../utils/constants");

const schema = new mongoose.Schema({
    id: {
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

const authSchema = mongoose.model(constants.AUTH_COLLECTION_NAME, schema);
module.exports = authSchema;
