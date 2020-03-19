const mongoose = require("mongoose");
const configs = require("../config/config.json");

const schema = new mongoose.Schema({
    studentID: {
        type: String,
        required: true
    },
    term: {
        type: Number
    },
    year: {
        type: Number
    },
    feeStatus: {
        type: String
    }
});

const feeSchema = mongoose.model(configs.FEE_COLLECTION_NAME, schema);
module.exports = feeSchema;
