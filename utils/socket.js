import io from 'socket.io-client';
const configs = require("../config/config.json");

const BASE_URL = process.env.NODE_ENV === configs.SOCKET_BASE_URL;
const socket = io(BASE_URL);

socket.on('connect', (e) => {
    socket.on('disconnect', () => {
        console.log("client disconnected");
    });
});

export default socket;