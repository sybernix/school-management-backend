const mongoose = require("mongoose");
const constants = require("../../utils/constants");

const schema = new mongoose.Schema({
    status: {
        type: String
    }
});

const compiledSchema = mongoose.model(constants.DF_MARITAL_STATUS_COLLECTION_NAME, schema);
module.exports = compiledSchema;
