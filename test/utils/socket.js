import io from 'socket.io-client';
const testConfigs = require("../config/config");

const BASE_URL = process.env.NODE_ENV === testConfigs.SOCKET_BASE_URL;
const socket = io(BASE_URL);

socket.on('connect', (e) => {
    socket.on('disconnect', () => {
        console.log("client disconnected");
    });
});

export default socket;