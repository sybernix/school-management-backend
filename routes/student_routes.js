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
router.get("/", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_STUDENT, (err, authData) => {
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
    jwt.verify(req.token, configs.JWT_KEY_STUDENT, (err, authData) => {
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
    jwt.verify(req.token, configs.JWT_KEY_STUDENT, (err, authData) => {
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
                            dateOfBirth: req.body.dateOfBirth,
                            dateOfAdmission: req.body.dateOfAdmission,
                            admissionNumber: req.body.admissionNumber,
                            classAdmitted: req.body.classAdmitted,
                            presentClass: req.body.presentClass,
                            house: req.body.house,
                            modeOfTransport: req.body.modeOfTransport,
                            schoolAttendedBefore: req.body.schoolAttendedBefore,
                            relativesInSchool: req.body.relativesInSchool,
                            medicalRemarks: req.body.medicalRemarks,
                            emergencyContacts: req.body.emergencyContacts,
                            homeAddress: req.body.homeAddress,
                            city: req.body.city,
                            fatherName: req.body.fatherName,
                            fatherOccupation: req.body.fatherOccupation,
                            fatherTelephone: req.body.fatherTelephone,
                            fatherEmail: req.body.fatherEmail,
                            motherName: req.body.motherName,
                            motherOccupation: req.body.motherOccupation,
                            motherTelephone: req.body.motherTelephone,
                            motherEmail: req.body.motherEmail,
                            guardianName: req.body.guardianName,
                            guardianOccupation: req.body.guardianOccupation,
                            guardianTelephone: req.body.guardianTelephone,
                            guardianEmail: req.body.guardianEmail
                        });
                        const  hash = bcrypt.hashSync(req.body.password, 8);
                        const authModel = new authSchema({
                            _id: mongoose.Types.ObjectId(),
                            userID: req.body.userID,
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
    jwt.verify(req.token, configs.JWT_KEY_STUDENT, (err, authData) => {
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
    jwt.verify(req.token, configs.JWT_KEY_STUDENT, (err, authData) => {
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
