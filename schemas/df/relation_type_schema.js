const mongoose = require("mongoose");
const constants = require("../../utils/constants");

const schema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    relation: {
        type: String
    },
    is_parent: {
        type: Boolean
    }
});

const compiledSchema = mongoose.model(constants.DF_RELATION_TYPE_COLLECTION_NAME, schema);
module.exports = compiledSchema;
