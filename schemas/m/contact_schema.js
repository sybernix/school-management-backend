const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  user_type: {
    type: String,
    required: true,
  },
  nic: {
    type: String,
  },
  email: {
    type: String,
  },
  passport: {
    type: String,
  },
  title_id: {
    type: String,
  },
  first_name: {
    type: String,
  },
  middle_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  sex: {
    type: String,
  },
  dob: {
    type: Date,
  },
  phone: {
    type: String,
  },
  user_type_id: {
    type: String,
  },
  access_level_id: {
    type: String,
  },
  is_active: {
    type: Boolean,
  },
});

module.exports = contactSchema;
