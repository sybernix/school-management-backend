const express = require("express");
const app = express();
const adminRoutes = require("./admin_routes");
const studentRoutes = require("./student_routes");
const parentRoutes = require("./parent_routes");
const teacherRoutes = require("./teacher_routes");
const classRoutes = require("./class_routes");
const classSectionRoutes = require("./class_section_routes");
const subjectRoutes = require("./subject_routes");
const extraActivityRoutes = require("./extra_activity_routes");
const marksRoutes = require("./marks_routes");
const organizationRoutes = require("./organization_routes");

app.use("/admin", adminRoutes);
app.use("/student", studentRoutes);
app.use("/parent", parentRoutes);
app.use("/teacher", teacherRoutes);
app.use("/class", classRoutes);
app.use("/classSection", classSectionRoutes);
app.use("/subject", subjectRoutes);
app.use("/extraActivity", extraActivityRoutes);
app.use("/marks", marksRoutes);
app.use("/organization", organizationRoutes);

module.exports = app;
