const mongoose = require("mongoose");
const constants = require("../../utils/constants");

const schema = new mongoose.Schema({
    student_id: {
        type: String,
        required: true
    },
    class_id: {
        type: String,
        required: true
    },
    reg_date: {
        type: Date
    },
    end_date: {
        type: Date
    }
});

const compiledSchema = mongoose.model(constants.REL_STUDENT_CLASS_COLLECTION_NAME, schema);
module.exports = compiledSchema;
