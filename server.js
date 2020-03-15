const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const adminRoutes = require("./routes/admin_routes");
const studentRoutes = require("./routes/student_routes");
const teacherRoutes = require("./routes/teacher_routes");
const io = require("socket.io");
const configs = require('./config/config');
const socketEvents = require("./utils/socket_events");

const server = app.listen(configs.BACKEND_PORT, function () {
    console.log("Student management system backend server is running on port : " + configs.BACKEND_PORT);
});

const socketServer = io(server);

mongoose
    .connect(
        configs.MONGO_URI + "/" + configs.MONGO_DB_NAME,
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
socketServer.on(socketEvents.CONNECT, async (socket) => {
    require('./sockets/joinedUser')(io, socket);
    require('./sockets/chatMessage')(io, socket);
    require('./sockets/disconnect')(io, socket);
    require('./sockets/privateMessage')(io, socket);
    require('./sockets/joinPrivateRoom')(io, socket);
});
