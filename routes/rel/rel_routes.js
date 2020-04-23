const express = require("express");
const app = express();
const extraActivityTeacherRoutes = require("./extra_activity_teacher_routes");
const parentStudentRoutes = require("./parent_student_routes");
const studentActivityRoutes = require("./student_activity_routes");
const studentActivityPositionRoutes = require("./student_activity_position_routes");
const studentClassRoutes = require("./student_class_routes");
const teacherClassRoutes = require("./teacher_class_routes");
const teacherQualificationRoutes = require("./teacher_qualification_routes");
const teacherSubjectClassRoutes = require("./teacher_subject_class_routes");

app.use("/extraActivityTeacher", extraActivityTeacherRoutes);
app.use("/parentStudent", parentStudentRoutes);
app.use("/studentActivity", studentActivityRoutes);
app.use("/studentActivityPosition", studentActivityPositionRoutes);
app.use("/studentClass", studentClassRoutes);
app.use("/teacherClass", teacherClassRoutes);
app.use("/teacherQualification", teacherQualificationRoutes);
app.use("/teacherSubjectClass", teacherSubjectClassRoutes);

module.exports = app;
