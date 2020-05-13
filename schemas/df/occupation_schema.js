const mongoose = require("mongoose");
const constants = require("../../utils/constants");

const schema = new mongoose.Schema({
    occupation_category_id: {
        type: String
    },
    occupation: {
        type: String
    },
    is_active: {
        type: String
    }
});

const compiledSchema = mongoose.model(constants.DF_OCCUPATION_COLLECTION_NAME, schema);
module.exports = compiledSchema;
