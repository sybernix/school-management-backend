const express = require("express");
const adminSchema = require("../../schemas/m/admin_schema");
const authSchema = require("../../schemas/auth_schema");
const tokenSchema = require("../../schemas/token_schema");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const configs = require("../../config/config.json");
const utils = require("../../utils/extract_token");
const constants = require("../../utils/constants");

const router = express.Router();

// Retrieve all admins
router.post("/retrieve/", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_ADMIN, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            adminSchema.find((err, admin) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json({
                        message: admin,
                        authData
                    });
                }
            });
        }
    });
});

// Retrieve admin  by ID
router.post("/retrieve/:id", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_ADMIN, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            let id = req.params.id;
            adminSchema.find({_id: id})
                .exec()
                .then(adminList => {
                    if (adminList.length < 1) {
                        return res.status(401).json({
                            message: "Authorization Failed!"
                        });
                    }
                    if (adminList) {
                        res.json(adminList[0]);
                    }
                })
        }
    });
});

//Add new admin
router.post("/add", (req, res) => {
    adminSchema.find( { $or:[ {'nic': req.body.nic}, {'phone':req.body.phone} ]},
        function(err,matchingAdmins){
            if (matchingAdmins.length >= 1) {
                console.log(matchingAdmins);
                res.status(409).json({
                    message: "admin already exists"
                });
            } else {
                const  hash = bcrypt.hashSync(req.body.password, 8);
                const newObjectID = mongoose.Types.ObjectId();
                const adminModel = new adminSchema({
                    _id: newObjectID,
                    user_type: constants.USER_TYPE_ADMIN,
                    nic: req.body.nic,
                    email: req.body.email,
                    passport: req.body.passport,
                    title_id: req.body.title_id,
                    first_name: req.body.first_name,
                    middle_name: req.body.middle_name,
                    last_name: req.body.last_name,
                    sex: req.body.sex,
                    dob: req.body.dob,
                    phone: req.body.phone,
                    access_level_id: req.body.access_level_id,
                    is_active: req.body.is_active,
                });
                const authModel = new authSchema({
                    user_id: newObjectID,
                    nic: req.body.nic,
                    phone: req.body.phone,
                    user_type: constants.USER_TYPE_ADMIN,
                    password_hash: hash
                });
                authModel.save().catch(err => {
                    console.log(err.message);
                    res.status(500).json({
                        error: err
                    });
                });
                adminModel
                    .save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: "admin added",
                            createdAdmin: result
                        });
                    })
                    .catch(err => {
                        console.log(err.message);
                        res.status(500).json({
                            error: err
                        });
                    });
            }
        });
    });

//update
router.post("/update/:id", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_ADMIN, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            adminSchema.findById(req.params._id, (err, admin) => {
                if (!admin) {
                    res.status(404).send("data is not found");
                } else {
                    admin.mail = req.body.email;
                    admin.password = req.body.password;
                    admin.email = req.body.email;
                    admin.passport = req.body.passport,
                    admin.title_id = req.body.title_id,
                    admin.first_name = req.body.first_name,
                    admin.middle_name = req.body.middle_name,
                    admin.last_name = req.body.last_name;
                    admin.sex = req.body.sex;
                    admin.dob = req.body.dob;
                    admin.phone = req.body.phone;
                    admin.access_level_id = req.body.access_level_id;
                    admin.is_active = req.body.is_active;
                    admin
                        .save()
                        .then(admin => {
                            res.json("admin updated");
                        })
                        .catch(err => {
                            res.status(400).send("Update not successful");
                        });
                }
            });
        }
    });
});

router.post("/delete/:id", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_ADMIN, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            adminSchema.findOneAndDelete({_id: req.params.id}, (err, admin) => {
                if (err) {
                    res.json(err);
                } else {
                    authSchema.findOneAndDelete({user_id: req.params.id}, (err, admin) => {
                        if (err) {
                            res.json(err);
                        } else {
                            tokenSchema.findOneAndDelete({user_id: req.params.id}, (err, admin) => {
                                if (err) {
                                    res.json(err);
                                } else {
                                    res.json("deleted successfully");
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;
