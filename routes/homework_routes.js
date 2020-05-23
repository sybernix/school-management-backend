const express = require("express");
const jwt = require("jsonwebtoken");
const configs = require("../config/config.json");
const constants = require("../utils/constants");
const utils = require("../utils/util_methods");
const fs = require('fs-extra');
const tokenSchema = require("../schemas/token_schema");
const fs_for_mkdir = require('fs');

const router = express.Router();

//Upload homework route
router.post("/upload", utils.extractToken, (req, res) => {
    tokenSchema
        .find({ token: req.token })
        .exec()
        .then((resultList) => {
            if (resultList.length < 1) {
                return res.status(401).json({
                    message: "Invalid Token",
                });
            }
            console.log(req.headers['class_id']);
            const class_id = req.headers['class_id'];
            const subject_id = req.headers['subject_id'];
            const upload_path = constants.HOMEWORK_DIRECTORY_PATH + class_id + "/" + subject_id;
            if (!fs_for_mkdir.existsSync(constants.HOMEWORK_DIRECTORY_PATH + class_id)){
                fs_for_mkdir.mkdirSync(constants.HOMEWORK_DIRECTORY_PATH + class_id);
            }
            if (!fs_for_mkdir.existsSync(upload_path)){
                fs_for_mkdir.mkdirSync(upload_path);
            }

            let fileStream;
            req.pipe(req.busboy);
            req.busboy.on('file', function (fieldName, file, fileName) {
                console.log("Uploading: " + fileName);
                //Path where homework will be uploaded
                fileStream = fs.createWriteStream(upload_path + "/" +  fileName);
                file.pipe(fileStream);
                fileStream.on('close', function () {
                    console.log("Upload Finished of " + fileName);
                    return res.status(200).json({
                        message: "Homework upload Success"
                    });
                });
            });
        });
});

router.get("/download", utils.extractToken, (req, res) => {
    tokenSchema
        .find({ token: req.token })
        .exec()
        .then((resultList) => {
            if (resultList.length < 1) {
                return res.status(401).json({
                    message: "Invalid Token",
                });
            }
            const class_id = req.headers['class_id'];
            const subject_id = req.headers['subject_id'];
            const file_id = req.headers['file_id'];
            const download_path = constants.HOMEWORK_DIRECTORY_PATH + class_id + "/" + subject_id + "/" + file_id;
            res.download(download_path);
        });
});

router.get("/getList", utils.extractToken, (req, res) => {
    tokenSchema
        .find({ token: req.token })
        .exec()
        .then((resultList) => {
            if (resultList.length < 1) {
                return res.status(401).json({
                    message: "Invalid Token",
                });
            }
            var fileJSON = {};
            var i =1;
            fs.readdir(constants.HOMEWORK_DIRECTORY_PATH, (err, files) => {
                files.forEach(file => {
                    fileJSON[i] = file;
                    i = i + 1;
                });
                return res.status(200).json(fileJSON);
            });
        });
});

module.exports = router;
