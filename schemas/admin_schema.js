const mongoose = require("mongoose");
const configs = require("../config/config.json");

const schema = new mongoose.Schema({
    adminID: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    passwordHash: {
        type: String,
        required: true
    },
});

const adminSchema = mongoose.model(configs.ADMIN_COLLECTION_NAME, schema);
module.exports = adminSchema;
