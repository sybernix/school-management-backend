const mongoose = require("mongoose");
const constants = require("../../utils/constants");

const schema = new mongoose.Schema({
    level: {
        type: String
    },
    is_admin: {
        type: Boolean
    },
    created_date: {
        type: Date
    },
    is_active: {
        type: Boolean
    }
});

const accessLevelSchema = mongoose.model(constants.DF_ACCESS_LEVEL_COLLECTION_NAME, schema);
module.exports = accessLevelSchema;
