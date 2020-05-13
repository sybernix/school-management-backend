const mongoose = require("mongoose");
const constants = require("../../utils/constants");

const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  line1: {
    type: String,
  },
  line2: {
    type: String,
  },
  line3: {
    type: String,
  },
  city: {
    type: String,
  },
  postcode: {
    type: String,
  },
  key: {
    type: String,
  },
});

const compiledSchema = mongoose.model(
  constants.M_ORGANIZATION_COLLECTION_NAME,
  schema
);
module.exports = compiledSchema;
