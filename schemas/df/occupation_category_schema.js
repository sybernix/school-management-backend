const mongoose = require("mongoose");
const constants = require("../../utils/constants");

const schema = new mongoose.Schema({
  occupation_category: {
    type: String,
  },
  category: {
    type: String,
  },
  is_active: {
    type: String,
  },
});

const compiledSchema = mongoose.model(
  constants.DF_OCCUPATION_CATEGORY_COLLECTION_NAME,
  schema
);
module.exports = compiledSchema;
