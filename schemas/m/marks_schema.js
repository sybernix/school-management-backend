const mongoose = require("mongoose");
const constants = require("../../utils/constants");

const schema = new mongoose.Schema({
    student_id: {
        type: String
    },
    class_id: {
        type: String
    },
    subject_id: {
        type: String
    },
    marks: {
        type: String
    },
    term: {
        type: String
    },
    date: {
        type: Date
    },
    grade_id: {
        type: String
    },
    created_date: {
        type: Date
    },
    created_user_id: {
        type: String
    },
    modified_date: {
        type: Date
    },
    modified_user_id: {
        type: String
    }
});

const compiledSchema = mongoose.model(constants.M_MARKS_COLLECTION_NAME, schema);
module.exports = compiledSchema;
