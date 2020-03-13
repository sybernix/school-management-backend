const io = require("socket.io-client");
const ev = require("./utils/events");
const logger = require("./utils/logger");

// initSocket returns a promise
// success: resolve a new socket object
// fail: reject a error
const initSocket = () => {
    return new Promise((resolve, reject) => {
        // create socket for communication
        const socket = io("localhost:5000", {
            "reconnection delay": 0,
            "reopen delay": 0,
            "force new connection": true
        });

        // define event handler for sucessfull connection
        socket.on(ev.CONNECT, () => {
            logger.info("connected");
            resolve(socket);
        });

        // if connection takes longer than 5 seconds throw error
        setTimeout(() => {
            reject(new Error("Failed to connect wihtin 5 seconds."));
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

describe("test suit: Echo & Bello", () => {
    test("test: ECHO", async () => {
        try {
            // create socket for communication
            const socketClient = await initSocket();

            // create new promise for server response
            const serverResponse = new Promise((resolve, reject) => {
                // define a handler for the test event
                socketClient.on(ev.res_ECHO, data4Client => {
                    //process data received from server
                    const { message } = data4Client;
                    logger.info("Server says: " + message);

                    // destroy socket after server responds
                    destroySocket(socketClient);

                    // return data for testing
                    resolve(data4Client);
                });

                // if response takes longer than 5 seconds throw error
                setTimeout(() => {
                    reject(new Error("Failed to get reponse, connection timed out..."));
                }, 5000);
            });

            // define data 4 server
            const data4Server = { message: "CLIENT ECHO" };

            // emit event with data to server
            logger.info("Emitting ECHO event");
            socketClient.emit(ev.com_ECHO, data4Server);

            // wait for server to respond
            const { status, message } = await serverResponse;
            expect(status).toBe(200);
            expect(message).toBe("SERVER ECHO");
        } catch (error) {
            logger.error(error);
        }
    });

    test("test BELLO", async () => {
        try {
            const socketClient = await initSocket();
            const serverResponse = new Promise((resolve, reject) => {
                socketClient.on(ev.res_BELLO, data4Client => {
                    const { message } = data4Client;
                    logger.info("Server says: " + message);
                    destroySocket(socketClient);
                    resolve(data4Client);
                });

                setTimeout(() => {
                    reject(new Error("Failed to get reponse, connection timed out..."));
                }, 5000);
            });

            const data4Server = { message: "CLIENT BELLO" };
            logger.info("Emitting BELLO event");
            socketClient.emit(ev.com_BELLO, data4Server);

            const { status, message } = await serverResponse;
            expect(status).toBe(200);
            expect(message).toBe("SERVER BELLO");
        } catch (error) {
            logger.error(error);
        }
    });
});