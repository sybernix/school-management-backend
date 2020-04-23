const express = require("express");
const app = express();
const adminRoutes = require("./admin_routes");
const studentRoutes = require("./student_routes");
const parentRoutes = require("./parent_routes");
const teacherRoutes = require("./teacher_routes");


app.use("/admin", adminRoutes);
app.use("/student", studentRoutes);
app.use("/parent", parentRoutes);
app.use("/teacher", teacherRoutes);

module.exports = app;