const express = require("express");
const jwt = require("jsonwebtoken");
const configs = require("../config/config.json");
const constants = require("../utils/constants");
const utils = require("../utils/extract_token");
const fs = require('fs-extra');       //File System - for file manipulation
// const json = require('json-simple');

const router = express.Router();

//Upload homework route
router.post("/upload", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_TEACHER, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            let fileStream;
            req.pipe(req.busboy); //todo create section id and class id, subject id subdirectories
            req.busboy.on('file', function (fieldName, file, fileName) { // todo give a generated name and send back in response/ root of the file
                console.log("Uploading: " + fileName);
                //Path where homework will be uploaded
                fileStream = fs.createWriteStream(constants.HOMEWORK_DIRECTORY_PATH + fileName);
                file.pipe(fileStream);
                fileStream.on('close', function () {
                    console.log("Upload Finished of " + fileName);
                    return res.status(200).json({
                        message: "Homework upload Success"
                    });
                });
            });
        }
    });
});

router.get("/download/:file(*)", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_TEACHER, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            const file = req.params.file;
            res.download(constants.HOMEWORK_DIRECTORY_PATH + file);
        }
    });
});

router.get("/getList", utils.extractToken, (req, res) => { //todo classwise getlist. active or expired homework. store details in a homework table with the file id mapping
    jwt.verify(req.token, configs.JWT_KEY_TEACHER, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            var fileJSON = {};
            var i =1;
            fs.readdir(constants.HOMEWORK_DIRECTORY_PATH, (err, files) => {
                files.forEach(file => {
                    fileJSON[i] = file;
                    i = i + 1;
                });
                return res.status(200).json(fileJSON);
            });
        }
    });
});

module.exports = router;
