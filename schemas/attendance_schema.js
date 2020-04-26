const mongoose = require("mongoose");
const constants = require("../utils/constants");

const schema = new mongoose.Schema({
    studentID: {
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    attended: {
        type: Boolean
    },
    authorized_absence: {
        type: Boolean
    }
});

const attendanceSchema = mongoose.model(constants.ATTENDANCE_COLLECTION_NAME, schema);
module.exports = attendanceSchema;
