const mongoose = require("mongoose");
const configs = require("../config/config.json");

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
    }
});

const attendanceSchema = mongoose.model(configs.ATTENDANCE_COLLECTION_NAME, schema);
module.exports = attendanceSchema;

