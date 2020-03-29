const mongoose = require("mongoose");
const constants = require("../utils/constants");

const schema = new mongoose.Schema({
    name: {
        type: String
    },
    teacherID: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    contactNumber: {
        type: Number
    },
    department: {
        type: String
    },
    title: {
        type: String
    }
});

const teacherSchema = mongoose.model(constants.TEACHER_COLLECTION_NAME, schema);
module.exports = teacherSchema;

