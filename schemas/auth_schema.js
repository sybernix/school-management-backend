const mongoose = require("mongoose");
const constants = require("../utils/constants");

const schema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    nic: {
        type: String,
    },
    phone: {
        type: String,
    },
    reg_no: {
        type: String,
    },
    password_hash: {
        type: String
    },
    user_type: {
        type: String
    }
});

const authSchema = mongoose.model(constants.AUTH_COLLECTION_NAME, schema);
module.exports = authSchema;
