const mongoose = require("mongoose");
const constants = require("../utils/constants");

const schema = new mongoose.Schema({
    parentID: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    associatedStudent: {
        type: String,
        required: true
    },
});

const parentSchema = mongoose.model(constants.PARENT_COLLECTION_NAME, schema);
module.exports = parentSchema;
