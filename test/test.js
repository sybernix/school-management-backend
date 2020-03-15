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
    test("test: Add User", async () => {
        try {
            console.log("Test started");
            // create socket for communication
            const socketClient = await initSocket();
            console.log("socket init done");

            // create new promise for server response
            // const serverResponse = new Promise((resolve, reject) => {
            //     console.log("entered promise");
            //     // define a handler for the test event
            //     socketClient.on(socketEvents.JOIN_USER, data4Client => {
            //         console.log("entered on event join user client side");
            //         //process data received from server
            //         const { message } = data4Client;
            //         logger.info("Server says: " + message);
            //
            //         // destroy socket after server responds
            //         destroySocket(socketClient);
            //
            //         // return data for testing
            //         resolve(data4Client);
            //     });
            //
            //     // if response takes longer than 5 seconds throw error
            //     setTimeout(() => {
            //         reject(new Error("Failed to get response, connection timed out..."));
            //     }, 5000);
            // });

            // const { status, message } = await serverResponse;
            // console.log("Server response status : " + status);
            // console.log("Server response message : " + message);

            // define data 4 server
            const dataToServer = { message: "CLIENT ECHO" };

            // emit event with data to server
            logger.info("Emitting ECHO event");
            socketClient.emit(socketEvents.JOIN_USER, dataToServer);

            // wait for server to respond
            const { status, message } = await serverResponse;
            expect(status).toBe(200);
            expect(message).toBe("SERVER ECHO");
        } catch (error) {
            logger.error(error);
        }
    });
});
