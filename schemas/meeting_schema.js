const mongoose = require("mongoose");
const constants = require("../utils/constants");

const schema = new mongoose.Schema({
    teacherID: {
        type: String,
        required: true
    },
    parentIDs: [{
        parentID: {
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
