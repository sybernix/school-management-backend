const mongoose = require("mongoose");
const configs = require("../config/config.json");

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

const parentSchema = mongoose.model(configs.PARENT_COLLECTION_NAME, schema);
module.exports = parentSchema;
