const mongoose = require("mongoose");

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

const studentSchema =  mongoose.model("students", schema);
module.exports = studentSchema;
