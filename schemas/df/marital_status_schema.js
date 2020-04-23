const mongoose = require("mongoose");
const constants = require("../../utils/constants");

const schema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String
    }
});

const compiledSchema = mongoose.model(constants.MARITAL_STATUS_COLLECTION_NAME, schema);
module.exports = compiledSchema;
