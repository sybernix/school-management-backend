const express = require("express");
const constants = require("../utils/constants");
const utils = require("../utils/util_methods");
const fs = require('fs-extra');
const tokenSchema = require("../schemas/token_schema");
const homeworkSchema = require("../schemas/homework_schema");
const fs_for_mkdir = require('fs');
const path = require('path');
const mongoose = require("mongoose");

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
            const newObjectID = mongoose.Types.ObjectId();
            req.pipe(req.busboy);
            req.busboy.on('file', function (fieldName, file, fileName) {
                const file_extension = path.extname(fileName);
                console.log("Uploading: " + fileName);
                //Path where homework will be uploaded
                fileStream = fs.createWriteStream(upload_path + "/" +  newObjectID + file_extension);
                file.pipe(fileStream);
                fileStream.on('close', function () {
                    const homeworkModel = new homeworkSchema({
                        _id: newObjectID,
                        class_id: class_id,
                        subject_id: subject_id,
                        file_id: fileName,
                        file_extension: file_extension,
                        date: new Date()
                    });
                    homeworkModel.save().catch((err) => {
                        console.log(err.message);
                        res.status(500).json({
                            error: err,
                        });
                    });
                    console.log("Upload Finished of " + newObjectID + file_extension);
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
            const schema_id = req.headers['schema_id'];
            homeworkSchema.find({_id: schema_id})
                .exec()
                .then(homeworkList => {
                    if (homeworkList.length < 1) {
                        return res.status(401).json({
                            message: "No such homework found!"
                        });
                    }
                    const download_path = constants.HOMEWORK_DIRECTORY_PATH + homeworkList[0].class_id + "/" +
                        homeworkList[0].subject_id + "/" + schema_id + homeworkList[0].file_extension;
                    res.download(download_path);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });

        });
});

router.get("/getList", utils.extractToken, (req, res) => {
    homeworkSchema.find({class_id: req.headers["class_id"]})
        .exec()
        .then(homeworkList => {
            if (homeworkList.length < 1) {
                return res.status(401).json({
                    message: "No such homework found!"
                });
            }
            res.json(homeworkList);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;
