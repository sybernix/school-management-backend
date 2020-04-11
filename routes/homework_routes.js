const express = require("express");
const jwt = require("jsonwebtoken");
const configs = require("../config/config.json");
const utils = require("../utils/extract_token");
const busboy = require('connect-busboy'); //middleware for form/file upload
const path = require('path');     //used for file path
const fs = require('fs-extra');       //File System - for file manipulation

const router = express.Router();

//Add attendance for a student for a day
router.post("/upload", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_ADMIN, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            var fstream;
            req.pipe(req.busboy);
            req.busboy.on('file', function (fieldname, file, filename) {
                console.log("Uploading: " + filename);

                //Path where image will be uploaded
                fstream = fs.createWriteStream(__dirname + '/img/' + filename);
                file.pipe(fstream);
                fstream.on('close', function () {
                    console.log("Upload Finished of " + filename);
                    res.redirect('back');           //where to go next
                });
            });
        }
    });
});

module.exports = router;
