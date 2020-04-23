const express = require("express");
const app = express();
const accessLevelRoutes = require("./access_level_routes");
const edQualificationRoutes = require("./ed_qualification_routes");
const edSpecialityRoutes = require("./ed_speciality_routes");
const extraActivityPositionRoutes = require("./extra_activity_position_routes");
const extraActivityTypeRoutes = require("./extra_activity_type_routes");
const gradeRoutes = require("./grade_routes");

app.use("/accessLevel", accessLevelRoutes);
app.use("/edQualification", edQualificationRoutes);
app.use("/edSpeciality", edSpecialityRoutes);
app.use("/extraActivityPosition", extraActivityPositionRoutes);
app.use("/extraActivityType", extraActivityTypeRoutes);
app.use("/extraActivityType", extraActivityTypeRoutes);
app.use("/grade", gradeRoutes);

module.exports = app;