const mongoose = require("mongoose");
const constants = require("../../utils/constants");

const schema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    position: {
        type: String
    }
});

const compiledSchema = mongoose.model(constants.EXTRA_ACTIVITY_POSITION_COLLECTION_NAME, schema);
module.exports = compiledSchema;
