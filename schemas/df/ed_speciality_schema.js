const mongoose = require("mongoose");
const constants = require("../../utils/constants");

const schema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    speciality: {
        type: String
    }
});

const compiledSchema = mongoose.model(constants.DF_ED_SPECIALITY_COLLECTION_NAME, schema);
module.exports = compiledSchema;
