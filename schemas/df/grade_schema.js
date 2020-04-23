const mongoose = require("mongoose");
const constants = require("../../utils/constants");

const schema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    min_marks: {
        type: Number
    },
    max_marks: {
        type: Number
    },
    section_id: {
        type: Number
    },
    grade: {
        type: String
    }
});

const compiledSchema = mongoose.model(constants.DF_GRADE_COLLECTION_NAME, schema);
module.exports = compiledSchema;
