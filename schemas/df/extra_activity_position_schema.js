const mongoose = require("mongoose");
const constants = require("../../utils/constants");

const schema = new mongoose.Schema({

    position: {
        type: String
    }
});

const compiledSchema = mongoose.model(constants.DF_EXTRA_ACTIVITY_POSITION_COLLECTION_NAME, schema);
module.exports = compiledSchema;
