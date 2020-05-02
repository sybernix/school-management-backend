const mongoose = require("mongoose");
const constants = require("../../utils/constants");

const schema = new mongoose.Schema({
    relation: {
        type: String
    },
    is_parent: {
        type: Boolean
    },
    is_active: {
        type: String
    }
});

const compiledSchema = mongoose.model(constants.DF_RELATION_TYPE_COLLECTION_NAME, schema);
module.exports = compiledSchema;
