const express = require("express");
const router = express.Router();
const parentSchema = require("../../schemas/m/parent_schema");
const authSchema = require("../../schemas/auth_schema");
const meetingSchema = require("../../schemas/meeting_schema");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const utils = require("../../utils/util_methods");
const configs = require("../../config/config.json");
const constants = require("../../utils/constants");

//Get all parents
router.post("/retrieve",  utils.extractToken, (req, res) => {
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
router.post("/retrieve/:id", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_PARENT, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            let id = req.params.id;
            parentSchema.find({id: id})
                .exec()
                .then(parentList => {
                    if (parentList.length < 1) {
                        return res.status(401).json({
                            message: "Authorization Failed!"
                        });
                    }
                    if (parentList) {
                        res.json(parentList[0]);
                    }
                })
        }
    });
});

//add new parent
router.post("/add", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_ADMIN, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            const  hash = bcrypt.hashSync(req.body.password, 8);
            const newObjectID = mongoose.Types.ObjectId();
            let parentModel = new parentSchema({
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
                occupation_id: req.body.occupation_id,
                marital_status_id: req.body.marital_status_id,
            });
            const authModel = new authSchema({
                user_id: newObjectID,
                nic: req.body.nic,
                phone: req.body.phone,
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
            parentSchema.update({id: req.params.id}, req.body)
                .then(result => {
                    res.status(200).json({
                        message: "Updated successfully",
                        createdParent: result
                    });
                })
                .catch(err => {
                    res.status(400).json({
                        message: "Updating failed",
                        error: err
                    });
                });
        }
    });
});

//parent Delete
router.post("/delete/:id", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_PARENT, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            parentSchema.findOneAndDelete(
                {id: req.params.id},
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
