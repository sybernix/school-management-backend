const mongoose = require("mongoose");
const constants = require("../../utils/constants");

const schema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    teacher_id: {
        type: String
    },
    class_id: {
        type: String
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    }
});

const compiledSchema = mongoose.model(constants.REL_TEACHER_CLASS_COLLECTION_NAME, schema);
module.exports = compiledSchema;
