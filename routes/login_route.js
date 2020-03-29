const express = require("express");
const authSchema = require("../schemas/auth_schema");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const configs = require("../config/config.json");
const constants = require("../utils/constants");

const router = express.Router();

//login
router.post("/", (req, res) => {
    authSchema.find({userID: req.body.userID})
        .exec()
        .then(userList => {
            if (userList.length < 1) {
                return res.status(401).json({
                    message: "Authorization Failed!"
                });
            }
            if (userList && bcrypt.compareSync(req.body.password, userList[0].passwordHash)) {
                //correct password
                var JWT_KEY;
                if (userList[0].userType.localeCompare(constants.USER_TYPE_ADMIN)) {
                    JWT_KEY = configs.JWT_KEY_ADMIN;
                } else if (userList[0].userType.localeCompare(constants.USER_TYPE_TEACHER)) {
                    JWT_KEY = configs.JWT_KEY_TEACHER
                } else if (userList[0].userType.localeCompare(constants.USER_TYPE_STUDENT)) {
                    JWT_KEY = configs.JWT_KEY_STUDENT
                } else if (userList[0].userType.localeCompare(constants.USER_TYPE_PARENT)) {
                    JWT_KEY = configs.JWT_KEY_PARENT
                }
                const token = jwt.sign(
                    {
                        id: userList[0]._id,
                        userType: constants.USER_TYPE_ADMIN,
                        adminID: userList[0].adminID
                    },
                    JWT_KEY,
                    {
                        expiresIn: "1000h"
                    }
                );
                    // console.log(admin);
                return res.status(200).json({
                    message: "Authorization Success",
                    token: token
                });
            }
            res.status(401).json({
                message: "Authorization Failed!"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;
