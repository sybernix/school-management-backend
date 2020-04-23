const mongoose = require("mongoose");
const constants = require("../../utils/constants");

const schema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    class_name: {
        type: String
    },
    class_section_id: {
        type: String
    }
});

const compiledSchema = mongoose.model(constants.M_CLASS_COLLECTION_NAME, schema);
module.exports = compiledSchema;
