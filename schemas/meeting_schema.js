const mongoose = require("mongoose");
const constants = require("../utils/constants");

const schema = new mongoose.Schema({
    teacher_id: {
        type: String,
        required: true
    },
    parent_ids: [{
        parent_id: {
            type: String
        }
    }],
    date: {
        type: Date,
        required: true
    }
});

const meetingSchema = mongoose.model(constants.MEETING_COLLECTION_NAME, schema);
module.exports = meetingSchema;
