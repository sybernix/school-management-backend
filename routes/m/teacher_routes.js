const express = require("express");
const router = express.Router();
const teacherSchema = require("../../schemas/m/teacher_schema");
const authSchema = require("../../schemas/auth_schema");
const meetingSchema = require("../../schemas/meeting_schema");
const utils = require("../../utils/extract_token");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const configs = require("../../config/config.json");
const constants = require("../../utils/constants");

//Get all teachers
router.post("/retrieve",  utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_ADMIN, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            teacherSchema.find((err, teacher) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(teacher);
                }
            });
        }
    });
});

//Get teacher By ID
router.post("/retrieve/:id", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_ADMIN, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            let id = req.params.id;
            teacherSchema.find({id: id})
                .exec()
                .then(teacherList => {
                    if (teacherList.length < 1) {
                        return res.status(401).json({
                            message: "Authorization Failed!"
                        });
                    }
                    if (teacherList) {
                        res.json(teacherList[0]);
                    }
                })
        }
    });
});

//add new teacher
router.post("/add", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_ADMIN, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            const  hash = bcrypt.hashSync(req.body.password, 8);
            const newObjectID = mongoose.Types.ObjectId();
            let teacherModel = new teacherSchema({
                _id: newObjectID,
                user_type: constants.USER_TYPE_TEACHER,
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
                reg_no: req.body.reg_no,
                reg_date: req.body.reg_date,
                end_date: req.body.end_date,
                teacher_grade_id: req.body.teacher_grade_id,
                marital_status_id: req.body.marital_status_id,
                is_active: req.body.is_active,
            });
            const authModel = new authSchema({
                user_id: newObjectID,
                nic: req.body.nic,
                phone: req.body.phone,
                userType: constants.USER_TYPE_TEACHER,
                passwordHash: hash
            });
            authModel.save().catch(err => {
                console.log(err.message);
                res.status(500).json({
                    error: err
                });
            });
            teacherModel
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
            teacherSchema.find(req.params.id, (err, teacher) => {
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
    jwt.verify(req.token, configs.JWT_KEY_ADMIN, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            teacherSchema.findOneAndDelete(
                {id: req.params.id},
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
