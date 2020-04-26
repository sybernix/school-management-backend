const mongoose = require("mongoose");
const constants = require("../utils/constants");

const schema = new mongoose.Schema({
    student_id: {
        type: String,
        required: true
    },
    term: {
        type: Number
    },
    year: {
        type: Number
    },
    fee_status: {
        type: String
    }
});

const feeSchema = mongoose.model(constants.FEE_COLLECTION_NAME, schema);
module.exports = feeSchema;
