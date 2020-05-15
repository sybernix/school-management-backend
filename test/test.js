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

    test("test: Send multiple messages", async () => {
        try {
            console.log("Test started");
            // create socket for communication
            const socketClient = await initSocket();
            console.log("socket init done");

            // define data 4 server
            const newMessage = { sender: "lankitha", receiver: "thissa", message: "Hi2"};
            const newMessage2 = { sender: "preshan", receiver: "lankitha", message: "Hi3"};
            const newMessage3 = { sender: "niruhan", receiver: "preshan", message: "Hi4"};

            // emit event with data to server
            logger.info("Emitting new message event");
            socketClient.emit(socketEvents.CHAT_MESSAGE, newMessage);
            socketClient.emit(socketEvents.CHAT_MESSAGE, newMessage2);
            socketClient.emit(socketEvents.CHAT_MESSAGE, newMessage3);

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

            // create new promise for server response
            const serverResponse = new Promise((resolve, reject) => {
                // define a handler for the test event
                socketClient.on("received messages", result => {
                    //process data received from server
                    console.log(result);
                    // const { message } = result;
                    logger.info("Server says: " + result[0].toString);

                    // destroy socket after server responds
                    destroySocket(socketClient);

                    // return data for testing
                    resolve(result);
                });

                // if response takes longer than 5 seconds throw error
                setTimeout(() => {
                    reject(new Error("Failed to get response, connection timed out..."));
                }, 5000);
            });

            // wait for server to respond
            const { status, message } = await serverResponse;
            // expect(status).toBe(200);
            // expect(message).toBe("SERVER ECHO");

        } catch (error) {
            logger.error(error);
        }
    });

    test("test: Instant messaging", async () => {
        try {
            console.log("Test started");
            // create socket for communication
            const socketClient = await initSocket();
            console.log("socket init done");

            // define data 4 server
            const user1 = { userId: "thissa"};
            const user2 = { userId: "niru"};

            // emit event with data to server
            logger.info("Emitting new message event");
            socketClient.emit(socketEvents.JOIN_USER, user1);
            socketClient.emit(socketEvents.JOIN_USER, user2);

            const newMessage = { sender: "niru", receiver: "thissa", message: "Hi2"};

            // create new promise for server response
            const serverResponse = new Promise((resolve, reject) => {
                // define a handler for the test event
                socketClient.on("thissa", result => {
                    //process data received from server
                    console.log(result);
                    // const { message } = result;
                    logger.info("Server says: " + result[0].toString);

                    // destroy socket after server responds
                    destroySocket(socketClient);

                    // return data for testing
                    resolve(result);
                });

                // if response takes longer than 5 seconds throw error
                setTimeout(() => {
                    reject(new Error("Failed to get response, connection timed out..."));
                }, 5000);
            });

            socketClient.emit(socketEvents.CHAT_MESSAGE, newMessage);

            // wait for server to respond
            const { status, message } = await serverResponse;
            // expect(status).toBe(200);
            // expect(message).toBe("SERVER ECHO");

        } catch (error) {
            logger.error(error);
        }
    });
});
