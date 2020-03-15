const mongoose = require("mongoose");
const configs = require("../config/config.json");

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
    },
    password: {
        type: String
    }
});

const teacherSchema = mongoose.model(configs.TEACHER_COLLECTION_NAME, schema);
module.exports = teacherSchema;

