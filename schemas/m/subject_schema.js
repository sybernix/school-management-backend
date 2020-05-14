const mongoose = require("mongoose");
const constants = require("../../utils/constants");

const schema = new mongoose.Schema({
  subject: {
    type: String,
  },
  class_section_id: {
    type: String,
  },
  is_active: {
    type: Boolean,
  },
});

const compiledSchema = mongoose.model(
  constants.M_SUBJECT_COLLECTION_NAME,
  schema
);
module.exports = compiledSchema;
