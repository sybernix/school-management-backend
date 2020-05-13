const mongoose = require("mongoose");
const constants = require("../../utils/constants");

const schema = new mongoose.Schema({
  title: {
    type: String,
  },
});

const compiledSchema = mongoose.model(
  constants.DF_TITLE_COLLECTION_NAME,
  schema
);
module.exports = compiledSchema;
