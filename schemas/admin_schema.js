const mongoose = require("mongoose");
const constants = require("../utils/constants");

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
    }
});

const adminSchema = mongoose.model(constants.ADMIN_COLLECTION_NAME, schema);
module.exports = adminSchema;
