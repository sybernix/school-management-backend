const mongoose = require("mongoose");
const constants = require("../../utils/constants");

const schema = new mongoose.Schema({
    teacher_id: {
        type: String,
        required: true
    },
    class_id: {
        type: String,
        required: true
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
