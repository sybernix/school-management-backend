const mongoose = require("mongoose");
const constants = require("../../utils/constants");

const schema = new mongoose.Schema({
    min_marks: {
        type: Number
    },
    max_marks: {
        type: Number
    },
    grade: {
        type: String
    },
    subject_id: {
        type: String
    },
    __subject: {
        type: String
    },
    is_active: {
        type: Boolean
    }
});

const compiledSchema = mongoose.model(constants.DF_GRADE_COLLECTION_NAME, schema);
module.exports = compiledSchema;
