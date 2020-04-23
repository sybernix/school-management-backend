const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        required: true
    },
    nic: {
        type: String
    },
    email: {
        type: String
    },
    passport: {
        type: String
    },
    title_id: {
        type: String
    },
    first_name: {
        type: String
    },
    middle_name: {
        type: String
    },
    last_name: {
        type: String
    },
    sex: {
        type: String
    },
    dob: {
        type: Date
    },
    phone: {
        type: String
    },
    access_level_id: {
        type: String
    },
});

module.exports = contactSchema;
