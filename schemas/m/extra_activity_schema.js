const mongoose = require("mongoose");
const constants = require("../../utils/constants");

const schema = new mongoose.Schema({
    extra_activity_type_id: {
        type: String
    },
    activity_name: {
        type: String
    },
    established_date: {
        type: Date
    },
    is_active: {
        type: Boolean
    }
});

const compiledSchema = mongoose.model(constants.M_EXTRA_ACTIVITY_COLLECTION_NAME, schema);
module.exports = compiledSchema;
