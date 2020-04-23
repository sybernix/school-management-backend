const mongoose = require("mongoose");
const constants = require("../../utils/constants");

const schema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    qualification: {
        type: String
    },
    sort_order: {
        type: Number
    }
});

const edQualificationSchema = mongoose.model(constants.ED_QUALIFICATION_COLLECTION_NAME, schema);
module.exports = edQualificationSchema;
