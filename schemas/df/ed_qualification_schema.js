const mongoose = require("mongoose");
const constants = require("../../utils/constants");

const schema = new mongoose.Schema({
    qualification: {
        type: String
    },
    sort_order: {
        type: Number
    },
    is_active: {
        type: String
    }
});

const edQualificationSchema = mongoose.model(constants.DF_ED_QUALIFICATION_COLLECTION_NAME, schema);
module.exports = edQualificationSchema;
