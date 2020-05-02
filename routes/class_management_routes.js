const express = require("express");
const attendanceSchema = require("../schemas/attendance_schema");
const feeSchema = require("../schemas/fee_schema");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const configs = require("../config/config.json");
const utils = require("../utils/util_methods");
const router = express.Router();

//Add attendance for a student for a day
router.post("/attendance/add", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_ADMIN, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            const attendanceModel = new attendanceSchema({
                _id: mongoose.Types.ObjectId(),
                studentID: req.body.studentID,
                date: req.body.date,
                attended: req.body.attended,
            });
            attendanceModel
                .save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: "attendance added",
                        createdAttendance: result
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

//Find attendance of a student for a day
router.post("/attendance/lookup", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_ADMIN, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            attendanceSchema.find({studentID: req.body.studentID, date: req.body.date}, (err, result) => {
                res.json(result);
            });
        }
    });
});

//Find absences of a student
router.get("/attendance/absence", utils.extractToken, (req, res) => { // todo
    jwt.verify(req.token, configs.JWT_KEY_ADMIN, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            attendanceSchema.find({attended: false}, (err, result) => {
                res.json(result);
            });
        }
    });
});

//Add fee for a student for a term
router.post("/fee/add", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_ADMIN, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            const feeModel = new feeSchema({
                _id: mongoose.Types.ObjectId(),
                studentID: req.body.studentID,
                term: req.body.term,
                year: req.body.year,
                feeStatus: req.body.feeStatus,
            });
            feeModel
                .save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: "fee added",
                        createdAttendance: result
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

//update fee status
router.post("/fee/updateStatus", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_ADMIN, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            feeSchema.find({studentID: req.body.studentID, term: req.body.term, year: req.body.year}, (err, result) => {
                if (!result) {
                    res.status(404).send("data is not found");
                } else {
                    result[0].feeStatus = req.body.feeStatus;
                    result[0]
                        .save()
                        .then(result => {
                            res.json("Fee status updated");
                        })
                        .catch(err => {
                            res.status(400).send("Update not successful");
                        })
                }
                res.json(result);
            });
        }
    });
});
//todo fee not paid reminder after 10 days of each term. have a term start end date table
module.exports = router;
