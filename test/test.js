const io = require("socket.io-client");
const socketEvents = require("../utils/socket_events");
const logger = require("./utils/logger");

// initSocket returns a promise
// success: resolve a new socket object
// fail: reject a error
const initSocket = () => {
    return new Promise((resolve, reject) => {
        // create socket for communication
        const socket = io("localhost:4000", {
            "reconnection delay": 0,
            "reopen delay": 0,
            "force new connection": true
        });

        // define event handler for successful connection
        socket.on(socketEvents.CONNECT, () => {
            logger.info("connected");
            resolve(socket);
        });

        // if connection takes longer than 5 seconds throw error
        setTimeout(() => {
            reject(new Error("Failed to connect within 5 seconds."));
        }, 5000);
    });
};

// destroySocket returns a promise
// success: resolve true
// fail: reject false
const destroySocket = socket => {
    return new Promise((resolve, reject) => {
        // check if socket connected
        if (socket.connected) {
            // disconnect socket
            logger.info("disconnecting...");
            socket.disconnect();
            resolve(true);
        } else {
            // not connected
            logger.info("no connection to break...");
            resolve(false);
        }
    });
};

describe("test suit: Add user, chat", () => {
    test("test: Send a new message", async () => {
        try {
            console.log("Test started");
            // create socket for communication
            const socketClient = await initSocket();
            console.log("socket init done");

            // define data 4 server
            const newMessage = { sender: "niruhan", receiver: "thissa", message: "Hi"};

            // emit event with data to server
            logger.info("Emitting new message event");
            socketClient.emit(socketEvents.CHAT_MESSAGE, newMessage);

        } catch (error) {
            logger.error(error);
        }
    });

    test("test: New user joins", async () => {
        try {
            console.log("Test started");
            // create socket for communication
            const socketClient = await initSocket();
            console.log("socket init done");

            // define data 4 server
            const newUser = { userId: "thissa"};

            // emit event with data to server
            logger.info("Emitting new message event");
            socketClient.emit(socketEvents.JOIN_USER, newUser);

        } catch (error) {
            logger.error(error);
        }
    });
});
