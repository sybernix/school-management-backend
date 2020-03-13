const winston = require("winston");

winston.clear();

winston.add(winston.transports.Console, { colorize: true, prettyPrint: true });
module.exports = winston;