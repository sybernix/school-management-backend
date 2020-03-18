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
  dateOfBirth: {
    type: Date
  },
  dateOfAdmission: {
    type: Date
  },
  admissionNumber: {
    type: String,
    required : true
  },
  classAdmitted: {
    type: String
  },
  presentClass: {
    type: String
  },
  house: {
    type: String
  },
  modeOfTransport: {
    type: String
  },
  schoolAttendedBefore: {
    type: String
  },
  relativesInSchool: {
    type: String
  },
  medicalRemarks: {
    type: String
  },
  emergencyContacts: {
    type: String
  },
  homeAddress: {
    type: String
  },
  city: {
    type: String
  },
  fatherName: {
    type: String
  },
  fatherOccupation: {
    type: String
  },
  fatherTelephone: {
    type: String
  },
  fatherEmail: {
    type: String
  },
  motherName: {
    type: String
  },
  motherOccupation: {
    type: String
  },
  motherTelephone: {
    type: String
  },
  motherEmail: {
    type: String
  },
  guardianName: {
    type: String
  },
  guardianOccupation: {
    type: String
  },
  guardianTelephone: {
    type: String
  },
  guardianEmail: {
    type: String
  },
});

const studentSchema =  mongoose.model(configs.STUDENT_COLLECTION_NAME, schema);
module.exports = studentSchema;
