const mongoose = require("mongoose");
const constants = require("../../utils/constants");

const schema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    type_name: {
        type: String
    },
    type: {
        type: String
    }
});

const compiledSchema = mongoose.model(constants.DF_USER_TYPE_COLLECTION_NAME, schema);
module.exports = compiledSchema;
