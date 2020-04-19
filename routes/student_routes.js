const express = require("express");
const studentSchema = require("../schemas/student_schema");
const authSchema = require("../schemas/auth_schema");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const configs = require("../config/config.json");
const utils = require("../utils/extract_token");
const constants = require("../utils/constants");

const router = express.Router();

//Get all student details
router.post("/retrieve", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_ADMIN, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            studentSchema.find(function (err, student) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(student);
                }
            });
        }
    });
});

router.post("/retrieve/:id", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_ADMIN, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            let id = req.params.id;
            studentSchema.find({id: id})
                .exec()
                .then(studentList => {
                    if (studentList.length < 1) {
                        return res.status(401).json({
                            message: "Authorization Failed!"
                        });
                    }
                    if (studentList) {
                        res.json(studentList[0]);
                    }
                })
        }
    });
});

//Add new student to db
router.post("/add", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_ADMIN, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            studentSchema.find({
                studentID: req.body.studentID
            })
                .exec()
                .then(student => {
                    if (student.length >= 1) {
                        res.status(409).json({
                            message: "Student already exists"
                        });
                    } else {
                        const studentModel = new studentSchema({
                            _id: mongoose.Types.ObjectId(),
                            id: req.body.id,
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
                            reg_no: req.body.reg_no,
                            reg_date: req.body.reg_date,
                            end_date: req.body.end_date,
                            is_active: req.body.is_active,
                        });
                        const  hash = bcrypt.hashSync(req.body.password, 8);
                        const authModel = new authSchema({
                            _id: mongoose.Types.ObjectId(),
                            id: req.body.id,
                            userType: constants.USER_TYPE_STUDENT,
                            passwordHash: hash
                        });
                        authModel.save().catch(err => {
                            console.log(err.message);
                            res.status(500).json({
                                error: err
                            });
                        });
                        studentModel
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "student added",
                                    createdStudent: result
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

//Update the student details
router.post("/update/:id", utils.extractToken, (req, res)  => {
    jwt.verify(req.token, configs.JWT_KEY_ADMIN, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            studentSchema.findById(req.params.id, function (err, studentmodel) {
                if (!studentmodel) res.status(404).send("Data is not found");
                else studentmodel.studentName = req.body.studentName;

                studentmodel.studentID = req.body.studentID;
                studentmodel.email = req.body.email;
                studentmodel.password = req.body.password;
                studentmodel.nic = req.body.nic;
                studentmodel.course = req.body.course;
                studentmodel
                    .save()
                    .then(studentmodel => {
                        res.json("student Updated");
                    })
                    .catch(err => {
                        res.status(400).send("Update not possible");
                    });
            });
        }
    });
});

// Delete the student
router.delete("/delete/:id", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_ADMIN, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            studentSchema.findOneAndDelete({id: req.params.id}, function (
                err
            ) {
                if (err) res.json(err);
                else res.json("Successfully removed");
            });
        }
    });
});

module.exports = router;
