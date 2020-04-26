const mongoose = require("mongoose");
const constants = require("../../utils/constants");

const schema = new mongoose.Schema({
    grade: {
        type: String
    }
});

const compiledSchema = mongoose.model(constants.M_CLASS_SECTION_COLLECTION_NAME, schema);
module.exports = compiledSchema;
