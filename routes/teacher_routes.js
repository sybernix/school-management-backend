const express = require("express");
const router = express.Router();
const teacherSchema = require("../schemas/teacher_schema");
const authSchema = require("../schemas/auth_schema");
const meetingSchema = require("../schemas/meeting_schema");
const utils = require("../utils/extract_token");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const configs = require("../config/config.json");
const constants = require("../utils/constants");

//Get all teachers
router.get("/",  utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_TEACHER, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            teacherSchema.find({
                parentID: req.body.parentID
            })
                .exec()
                .then(meetings => {
                        res.status(200).body(meetings);
                    });
        }
    });
});

//Get teacher By ID
router.get("/:id", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_TEACHER, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            let id = req.params.id;
            teacherSchema.findById(id, (err, teacher) => {
                res.json(teacher);
            });
        }
    });
});

//add new teacher
router.post("/add", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_TEACHER, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            let instructormodel = new teacherSchema({
                teacherID: req.body.teacherID,
                name: req.body.name,
                email: req.body.email,
                contactNumber: req.body.contactNumber,
                department: req.body.department,
                title: req.body.title
            });
            const  hash = bcrypt.hashSync(req.body.password, 8);
            const authModel = new authSchema({
                _id: mongoose.Types.ObjectId(),
                userID: req.body.userID,
                userType: constants.USER_TYPE_TEACHER,
                passwordHash: hash
            });
            authModel.save().catch(err => {
                console.log(err.message);
                res.status(500).json({
                    error: err
                });
            });
            instructormodel
                .save()
                .then(result => {
                    res.status(200).json({
                        message: "New teacher added successfully",
                        createdTeacher: result
                    });
                })
                .catch(err => {
                    res.status(400).json({
                        message: "Adding new teacher failed",
                        error: err
                    });
                });
        }
    });
});

//Update teacher
router.post("/update/:id", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_TEACHER, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            teacherSchema.findById(req.params.id, (err, teacher) => {
                if (!teacher) {
                    res.status(404).send("Data is not found");
                } else {
                    teacher.name = req.body.name;
                    teacher.mail = req.body.mail;
                    teacher.contactNumber = req.body.number;
                    teacher.dept = req.body.dept;
                    teacher.title = req.body.title;
                    teacher.password = req.body.password;

                    teacher
                        .save()
                        .then(teacher => {
                            res.json("Teacher updated");
                        })
                        .catch(err => {
                            res.status(400).send("Updated not successful");
                        });
                }
            });
        }
    });
});

//teacher Delete
router.delete("/delete/:id", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_TEACHER, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            teacherSchema.findOneAndDelete(
                {_id: req.params.id},
                (err, teacher) => {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json("Deleted successfully");
                    }
                }
            );
        }
    });
});

// teacher schedules a parent meeting
router.post("/scheduleMeeting", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_TEACHER, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            const meetingModel = new meetingSchema({
                _id: mongoose.Types.ObjectId(),
                teacherID: req.body.teacherID,
                parentIDs: req.body.parentIDs,
                date: req.body.date,
            });
            meetingModel.save()
                .then(result => {
                    res.status(200).json({
                        message: "Parent-Teacher meeting added successfully",
                        createdMeeting: result
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

module.exports = router;
