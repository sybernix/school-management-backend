const mongoose = require("mongoose");
const configs = require("../config/config.json");

const schema = new mongoose.Schema({
  studentName: {
    type: String
  },
  studentID:{
    type: String,
    required : true
  },
  email: {
    type: String
  },
  password: {
    type: String,
    required : true
  },
  nic: {
    type: String
  }
});

const studentSchema =  mongoose.model(configs.STUDENT_COLLECTION_NAME, schema);
module.exports = studentSchema;
