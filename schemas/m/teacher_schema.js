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
    },
    teacher_grade_id: {
        type: String
    },
    marital_status_id: {
        type: String
    }
});

const teacherSchema = mongoose.model(constants.M_TEACHER_COLLECTION_NAME, schema);
module.exports = teacherSchema;

