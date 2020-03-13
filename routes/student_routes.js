const express = require("express");
const studentSchema = require("../schemas/student_schema");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const configs = require("../config/config.json");
const utils = require("../utils/extract_token");

const router = express.Router();
const JWT_KEY = configs.JWT_KEY;

//Get all student details
router.get("/", utils.extractToken, (req, res) => {
    jwt.verify(req.token, JWT_KEY, (err, authData) => {
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

router.get("/:id", utils.extractToken, (req, res) => {
    jwt.verify(req.token, JWT_KEY, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            let id = req.params.id;
            studentSchema.findById(id, function (err, students) {
                res.json(students);
            });
        }
    });
});

//Add new student to db
router.post("/add", utils.extractToken, (req, res) => {
    jwt.verify(req.token, JWT_KEY, (err, authData) => {
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
                            studentName: req.body.studentName,
                            studentID: req.body.studentID,
                            email: req.body.email,
                            password: req.body.password,
                            nic: req.body.nic,
                            userType: "student"
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

//login
router.post("/login", (req, res) => {
    console.log(req.body.studentID);
    Studentmodel.find({studentID: req.body.studentID})
        .exec()
        .then(studentList => {
            console.log(studentList);
            if (studentList.length < 1) {
                return res.status(401).json({
                    message: "Authorization Failed!"
                });
            }
            if (studentList && bcrypt.compareSync(req.body.password, studentList[0].passwordHash)) {
                //correct password
                const token = jwt.sign(
                    {
                        id: studentList[0]._id,
                        studentID: studentList[0].studentID
                    },
                    JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                );
                console.log(studentList);
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

//Update the student details
router.post("/update/:id", utils.extractToken, (req, res)  => {
    jwt.verify(req.token, JWT_KEY, (err, authData) => {
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
    jwt.verify(req.token, JWT_KEY, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            studentSchema.findOneAndDelete({_id: req.params.id}, function (
                err
            ) {
                if (err) res.json(err);
                else res.json("Successfully removed");
            });
        }
    });
});

module.exports = router;
