const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const adminRoutes = require("./routes/admin_routes");
const studentRoutes = require("./routes/student_routes");
const teacherRoutes = require("./routes/teacher_routes");
const server = require('http').Server(app);
const io = require('socket.io')(server);
const configs = require('config/config');

mongoose
    .connect(
        configs.MONGO_URI,
        {useNewUrlParser: true}
    )
    .then(() => {
        console.log("MongoDB database connection established successfully");
    })
    .catch(err => {
        console.log(err.message);
    });

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/admin", adminRoutes);
app.use("/student", studentRoutes);
app.use("/teacher", teacherRoutes);

// Sockets
io.on('connection', async (socket) => {
    require('./sockets/chat/joinedUser')(io, socket);
    require('./sockets/chat/chatMessage')(io, socket);
    require('./sockets/chat/disconnect')(io, socket);
    require('./sockets/chat/privateMessage')(io, socket);
    require('./sockets/chat/joinPrivateRoom')(io, socket);
});

app.listen(PORT, function () {
    console.log("Student management system backend server is running on port : " + configs.BACKEND_PORT);
});
