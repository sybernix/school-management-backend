const mongoose = require("mongoose");
const constants = require("../../utils/constants");

const schema = new mongoose.Schema({
    teacher_id: {
        type: String,
        required: true
    },
    ed_qualification_id: {
        type: String,
        required: true
    },
    ed_speciality_id: {
        type: String,
        required: true
    },
    Institute_id: {
        type: String
    },
    institute: {
        type: String
    },
    reference_no: {
        type: String
    },
    started_date: {
        type: Date
    },
    finished_date: {
        type: Date
    },
    completed: {
        type: Boolean
    }
});

const compiledSchema = mongoose.model(constants.REL_TEACHER_QUALIFICATION_COLLECTION_NAME, schema);
module.exports = compiledSchema;
