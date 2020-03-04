const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const adminRoutes = require("./routes/admin_routes");
const studentRoutes = require("./routes/student_routes");
const teacherRoutes = require("./routes/teacher_routes");
const PORT = 4000;

mongoose
    .connect(
        "mongodb://localhost:27017/school_database",
        {useNewUrlParser: true}
    )
    .then(() => {
        console.log("MongoDB database connection established successfully");
    })
    .catch(err => {
        console.log(err.message);
    });

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/admin", adminRoutes);
app.use("/student", studentRoutes);
app.use("/teacher", teacherRoutes);

app.listen(PORT, function () {
    console.log("Student management system backend server is running on port : " + PORT);
});
