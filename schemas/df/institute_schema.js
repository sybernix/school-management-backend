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

const compiledSchema = mongoose.model(constants.DF_INSTITUTE_COLLECTION_NAME, schema);
module.exports = compiledSchema;
