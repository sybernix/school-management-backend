const mongoose = require("mongoose");
const constants = require("../utils/constants");

const schema = new mongoose.Schema({
    class_id: {
        type: String
    },
    subject_id: {
        type: String
    },
    file_id: {
        type: String
    },
    file_extension: {
        type: String
    },
    date: {
        type: Date
    }
});

const tokenSchema = mongoose.model(constants.HOMEWORK_COLLECTION_NAME, schema);
module.exports = tokenSchema;
