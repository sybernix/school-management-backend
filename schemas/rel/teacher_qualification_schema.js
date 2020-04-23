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
    ed_qualification_id: {
        type: String
    },
    ed_spacility_id: {
        type: String
    },
    Institute_id: {
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
