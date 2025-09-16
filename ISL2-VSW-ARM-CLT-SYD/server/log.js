/** @format */

// jshint esversion: 8
const path = require("path");

const winston = require("winston");
// const fecha = require("fecha");
// const {
//     format
// } = require('logform');
require("winston-daily-rotate-file");
const fs = require("fs");

// const DailyRotateFile = require('winston-daily-rotate-file');

const forPrintf = message => (typeof message === "string" ? message : JSON.stringify(message, null, 4));

module.exports = module => {
    // console.log('module = ' + module.filename);
    // console.log('DEVELOPMENT = ' + process.env.DEVELOPMENT);

    const moduleName = module.filename.split("\\").slice(-3).join("\\");
    // console.log(`module: "${JSON.stringify(module)}"; moduleName: "${moduleName}"`);
    // console.log(`module.filename: "${module.filename}"; moduleName: "${moduleName}"`);

    const folderName = path.join(__dirname, "/logs");
    try {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
        }
    } catch (err) {
        console.error(err);
    }

    let objLog = winston.createLogger({
        // level: "verbose",
        // format: winston.format.combine(
        //     // winston.format.colorize(),
        //     winston.format.timestamp({
        //         format: 'HH:mm:ss.SSS'
        //     }),
        //     winston.format.label({
        //         label: moduleName
        //     }),
        //     winston.format.splat(),
        //     winston.format.printf(info => `${info.timestamp} {${info.label}} [${info.level}]> ${JSON.stringify(info.message, null, 4)}`),
        //     // winston.format.printf(info => `${info.timestamp} {${info.label}} [${info.level}]> ${info.message}`),
        //     // winston.format.printf(info => `${fecha.format(info.timestamp, 'HH:mm:ss.SSS')} {${info.label}} [${info.level}]> ${info.message}`),
        // ),
        transports: [
            // new winston.transports.File({ filename: 'combined.log' }),
            new winston.transports.DailyRotateFile({
                dirname: folderName, //path.join(__dirname, '/log'),
                filename: "isl2-%DATE%.log",
                datePattern: "YYYY-MM-DD",
                // zippedArchive: true,
                maxSize: "20m",
                maxFiles: "14d",
                // colorize: false,
                // timestamp: {format: 'YYYY.MM.DD HH:mm:ss.SSS'},
                level: global.configuration.development ? "silly" : "warn", //process.env.DEVELOPMENT ? 'debug' : 'warn',
                format: winston.format.combine(
                    // winston.format.colorize(),
                    winston.format.timestamp({
                        format: "HH:mm:ss.SSS",
                    }),
                    winston.format.label({
                        label: moduleName,
                    }),
                    winston.format.splat(),
                    winston.format.printf(info => `${info.timestamp} {${info.label}} [${info.level}]> ${forPrintf(info.message)}`) //(typeof(info.message) === 'string') ? info.message : JSON.stringify(info.message, null, 4)}`),
                    // winston.format.printf(info => `${info.timestamp} {${info.label}} [${info.level}]> ${info.message}`),
                    // winston.format.printf(info => `${fecha.format(info.timestamp, 'HH:mm:ss.SSS')} {${info.label}} [${info.level}]> ${info.message}`),
                ),
            }),
            new winston.transports.Console({
                // colorize: true,
                level: global.configuration.development ? "debug" : "warn", //process.env.DEVELOPMENT ? 'debug' : 'warn',
                // timestamp: {format: 'HH:mm:ss.SSS'},
                // format: winston.format.colorize(),
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.timestamp({
                        format: "HH:mm:ss.SSS",
                    }),
                    winston.format.label({
                        label: moduleName,
                    }),
                    winston.format.splat(),
                    winston.format.printf(info => `${info.timestamp} {${info.label}} [${info.level}]> ${forPrintf(info.message)}`)
                    // winston.format.printf(info => `${info.timestamp} {${info.label}} [${info.level}]> ${info.message}`),
                    // winston.format.printf(info => `${fecha.format(info.timestamp, 'HH:mm:ss.SSS')} {${info.label}} [${info.level}]> ${info.message}`),
                ),
            }),
        ],
    });

    if (global.configuration.development && moduleName === "ISL2\\server.js") {
        objLog.debug("--------+++++++**********+++++++--------");
        objLog.debug(`!!!DEVELOPMENT MODE!!! ${global.configuration.dbConnection ? "WITH" : "WITHOUT"} databases`);
    }
    return objLog;
};

module.exports.setMorgan = (logger, morgan) => {
    // console.log('setMorgan');
    logger.stream = {
        write: function (message, encoding) {
            logger.silly(message);
        },
    };
};
