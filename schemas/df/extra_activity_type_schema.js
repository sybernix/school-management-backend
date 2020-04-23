const mongoose = require("mongoose");
const constants = require("../../utils/constants");

const schema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    type: {
        type: String
    }
});

const compiledSchema = mongoose.model(constants.DF_EXTRA_ACTIVITY_TYPE_COLLECTION_NAME, schema);
module.exports = compiledSchema;
