const mongoose = require("mongoose");
const constants = require("../../utils/constants");
const ContactSchema = require("./contact_schema");

const schema = ContactSchema.add({
  reg_no: {
    type: String
  },
  reg_date: {
    type: Date
  },
  end_date: {
    type: Date
  }
});

const studentSchema =  mongoose.model(constants.M_STUDENT_COLLECTION_NAME, schema);
module.exports = studentSchema;
