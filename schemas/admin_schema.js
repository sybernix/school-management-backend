const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    adminID: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    userType: {
        type: String,
        required: true
    }
});

const adminSchema = mongoose.model("admins", schema);
module.exports = adminSchema;

