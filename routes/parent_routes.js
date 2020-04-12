const express = require("express");
const router = express.Router();
const parentSchema = require("../schemas/parent_schema");
const authSchema = require("../schemas/auth_schema");
const meetingSchema = require("../schemas/meeting_schema");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const utils = require("../utils/extract_token");
const configs = require("../config/config.json");
const constants = require("../utils/constants");

//Get all parents
router.get("/",  utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_PARENT, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            parentSchema.find((err, parents) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(parents);
                }
            });
        }
    });
});

//Get parent By ID
router.get("/:id", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_PARENT, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            let id = req.params.id;
            parentSchema.findById(id, (err, parent) => {
                res.json(parent);
            });
        }
    });
});

//add new parent
router.post("/add", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_PARENT, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            const  hash = bcrypt.hashSync(req.body.password, 8);
            let parentModel = new parentSchema({
                _id: mongoose.Types.ObjectId(),
                parentID: req.body.parentID,
                name: req.body.name,
                email: req.body.email,
                associatedStudent: req.body.associatedStudent
            });
            const authModel = new authSchema({
                _id: mongoose.Types.ObjectId(),
                userID: req.body.userID,
                userType: constants.USER_TYPE_PARENT,
                passwordHash: hash
            });
            authModel.save().catch(err => {
                console.log(err.message);
                res.status(500).json({
                    error: err
                });
            });
            parentModel
                .save()
                .then(result => {
                    res.status(200).json({
                        message: "New parent added successfully",
                        createdParent: result
                    });
                })
                .catch(err => {
                    res.status(400).json({
                        message: "Adding new parent failed",
                        error: err
                    });
                });
        }
    });
});

//Update parent
router.post("/update/:id", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_PARENT, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            parentSchema.findById(req.params.id, (err, parent) => {
                if (!parent) {
                    res.status(404).send("data is not found");
                } else {
                    const  hash = bcrypt.hashSync(req.body.password, 8);
                    parent.name = req.body.name;
                    parent.parentID = req.body.parentID;
                    parent.email = req.body.email;
                    parent.passwordHash = hash;

                    parent
                        .save()
                        .then(parent => {
                            res.json("Parent updated");
                        })
                        .catch(err => {
                            res.status(400).send("Parent update not successful");
                        });
                }
            });
        }
    });
});

//parent Delete
router.delete("/delete/:id", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_PARENT, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            parentSchema.findOneAndDelete(
                {_id: req.params.id},
                (err, parent) => {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json("Parent deleted successfully");
                    }
                }
            );
        }
    });
});

// Get any parent-teacher meeting scheduled
router.get("/meeting", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_PARENT, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            meetingSchema.find({
                parentID: req.body.parentID
            })
                .exec()
                .then(meetings => {
                    res.status(200).body(meetings);
                });
        }
    });
});

module.exports = router;
