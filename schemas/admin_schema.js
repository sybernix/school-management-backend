const mongoose = require("mongoose");
const constants = require("../utils/constants");
const ContactSchema = require("./contact_schema");


const schema = ContactSchema.add({
    is_active: {
        type: String
    }
});

const adminSchema = mongoose.model(constants.ADMIN_COLLECTION_NAME, schema);
module.exports = adminSchema;
