const mongoose = require("mongoose");
const constants = require("../../utils/constants");
const ContactSchema = require("./contact_schema");

const schema = ContactSchema.add({
    occupation_id: {
        type: String
    },
    marital_status_id: {
        type: String
    }
});

const parentSchema = mongoose.model(constants.M_PARENT_COLLECTION_NAME, schema);
module.exports = parentSchema;
