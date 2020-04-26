const mongoose = require("mongoose");
const constants = require("../../utils/constants");

const schema = new mongoose.Schema({
    extra_activity_id: {
        type: String,
        required: true
    },
    teacher_id: {
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

const compiledSchema = mongoose.model(constants.REL_EXTRA_ACTIVITY_TEACHER_COLLECTION_NAME, schema);
module.exports = compiledSchema;
