const mongoose = require("mongoose");
const constants = require("../../utils/constants");

const schema = new mongoose.Schema({
    user_id: {
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

const edQualificationSchema = mongoose.model(constants.DF_ED_QUALIFICATION_COLLECTION_NAME, schema);
module.exports = edQualificationSchema;
