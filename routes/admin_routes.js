const express = require("express");
const adminModel = require("../schemas/admin_schema");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const keys = require("../config/key.json");

const router = express.Router();
const JWT_KEY = keys.JWT_KEY;

//Retrieve all admins
router.get("/admin", (req, res) => {
    adminModel.find((err, admin) => {
        if (err) {
            console.log(err);
        } else {
            res.json(admin);
        }
    });
});

//Retrieve admin  by ID
router.get("/admin/:id", (req, res) => {
    let id = req.params.id;
    adminModel.findById(id, (err, admin) => {
        res.json(admin);
    });
});

//Add new admin
router.post("/admin/add", (req, res) => {
    adminModel.find({
        adminID: req.body.adminID
    })
        .exec()
        .then(admin => {
            if (admin.length >= 1) {
                res.status(409).json({
                    message: "admin already exists"
                });
            } else {
                const adminmodel = new adminModel({
                    _id: mongoose.Types.ObjectId(),
                    adminID: req.body.adminID,
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    userType: "admin"
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
router.post("/admin/login", (req, res) => {
    console.log(req.body.adminID)
    adminModel.find({adminID: req.body.adminID})
        .exec()
        .then(admin => {
            console.log(admin);
            if (admin.length < 1) {
                return res.status(401).json({
                    message: "Authorization Failed!"
                });
            }
            if (admin) {
                //correct password
                const token = jwt.sign(
                    {
                        id: admin[0]._id,
                        adminID: admin[0].adminID,
                        userType: admin[0].userType
                    },
                    JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                );
                console.log(admin);
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
router.post("/admin/update/:id", (req, res) => {
    adminModel.findById(req.params.id, (err, admin) => {
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
});

router.delete("/admin/delete/:id", (req, res) => {
    adminModel.findOneAndDelete({_id: req.params.id}, (err, admin) => {
        if (err) {
            res.json(err);
        } else {
            res.json("deleted successfully");
        }
    });
});

module.exports = router;
