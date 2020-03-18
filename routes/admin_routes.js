const express = require("express");
const adminSchema = require("../schemas/admin_schema");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const configs = require("../config/config.json");
const utils = require("../utils/extract_token");

const router = express.Router();

//Retrieve all admins
router.get("/", utils.extractToken, (req, res) => {
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

//Retrieve admin  by ID
router.get("/:id", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_ADMIN, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            let id = req.params.id;
            adminSchema.findById(id, (err, admin) => {
                res.json(admin);
            });
        }
    });
});

//Add new admin
router.post("/add", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_ADMIN, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            adminSchema.find({
                adminID: req.body.adminID
            })
                .exec()
                .then(admin => {
                    if (admin.length >= 1) {
                        res.status(409).json({
                            message: "admin already exists"
                        });
                    } else {
                        const  hash = bcrypt.hashSync(req.body.password, 8);
                        const adminmodel = new adminSchema({
                            _id: mongoose.Types.ObjectId(),
                            adminID: req.body.adminID,
                            name: req.body.name,
                            email: req.body.email,
                            passwordHash: hash
                        });
                        adminmodel
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
        }
    });
});

//Add new admin
router.post("/addNoLogin", (req, res) => {
            adminSchema.find({
                adminID: req.body.adminID
            })
                .exec()
                .then(admin => {
                    if (admin.length >= 1) {
                        res.status(409).json({
                            message: "admin already exists"
                        });
                    } else {
                        const  hash = bcrypt.hashSync(req.body.password, 8);
                        const adminmodel = new adminSchema({
                            _id: mongoose.Types.ObjectId(),
                            adminID: req.body.adminID,
                            name: req.body.name,
                            email: req.body.email,
                            passwordHash: hash
                        });
                        adminmodel
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

//login
router.post("/login", (req, res) => {
    adminSchema.find({adminID: req.body.adminID})
        .exec()
        .then(adminList => {
            if (adminList.length < 1) {
                return res.status(401).json({
                    message: "Authorization Failed!"
                });
            }
            if (adminList && bcrypt.compareSync(req.body.password, adminList[0].passwordHash)) {
                //correct password
                const token = jwt.sign(
                    {
                        id: adminList[0]._id,
                        adminID: adminList[0].adminID
                    },
                    configs.JWT_KEY_ADMIN,
                    {
                        expiresIn: "1h"
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

//update
router.post("/update/:id", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_ADMIN, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            adminSchema.findById(req.params.id, (err, admin) => {
                if (!admin) {
                    res.status(404).send("data is not found");
                } else {
                    (admin.adminID = req.body.adminID), (admin.name = req.body.name);
                    admin.mail = req.body.email;
                    admin.password = req.body.password;

                    admin
                        .save()
                        .then(admin => {
                            res.json("admin updated");
                        })
                        .catch(err => {
                            res.status(400).send("updated not succesful");
                        });
                }
            });
        }
    });
});

router.delete("/delete/:id", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_ADMIN, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            adminSchema.findOneAndDelete({_id: req.params.id}, (err, admin) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json("deleted successfully");
                }
            });
        }
    });
});

module.exports = router;
