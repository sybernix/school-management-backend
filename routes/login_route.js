const express = require("express");
const authSchema = require("../schemas/auth_schema");
const tokenSchema = require("../schemas/token_schema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const configs = require("../config/config.json");
const constants = require("../utils/constants");
const utils = require("../utils/extract_token");
const mongoose = require("mongoose");

const router = express.Router();

//login
router.post("/", (req, res) => {
    authSchema.find({id: req.body.id})
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
                if (userList[0].userType == constants.USER_TYPE_ADMIN) {
                    JWT_KEY = configs.JWT_KEY_ADMIN;
                } else if (userList[0].userType == constants.USER_TYPE_TEACHER) {
                    JWT_KEY = configs.JWT_KEY_TEACHER
                } else if (userList[0].userType == constants.USER_TYPE_STUDENT) {
                    JWT_KEY = configs.JWT_KEY_STUDENT
                } else if (userList[0].userType == constants.USER_TYPE_PARENT) {
                    JWT_KEY = configs.JWT_KEY_PARENT
                }
                const token = jwt.sign(
                    {
                        userType: userList[0].userType,
                        id: userList[0].id
                    },
                    JWT_KEY,
                    {
                        expiresIn: "1000h"
                    }
                );
                const tokenModel = new tokenSchema({
                    _id: new mongoose.Types.ObjectId(),
                    id: req.body.id,
                    userType: userList[0].userType,
                    token: token
                });
                tokenModel.save().catch(err => { // todo check for previous  tokens for the same userID and delete. implement async to expire saved tokens
                    console.log("Error in saving token during login: " + err.message);
                });
                    // console.log(admin);
                return res.status(200).json({
                    message: "Authorization Success",
                    token: token,
                    userType: userList[0].userType
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

// Verify whether the token is correct
router.post("/verifyToken", utils.extractToken, (req, res) => {
    tokenSchema.find({token: req.token})
        .exec()
        .then(tokenList => {
            if (tokenList.length < 1) {
                return res.status(401).json({
                    message: "Verification Failed!"
                });
            }
            res.json({
                message: "JWT Token is Valid",
                userType: tokenList[0].userType,
                id: tokenList[0].id
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
