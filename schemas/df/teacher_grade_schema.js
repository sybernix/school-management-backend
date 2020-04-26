const mongoose = require("mongoose");
const constants = require("../../utils/constants");

const schema = new mongoose.Schema({
    level: {
        type: String
    }
});

const compiledSchema = mongoose.model(constants.DF_TEACHER_GRADE_COLLECTION_NAME, schema);
module.exports = compiledSchema;
