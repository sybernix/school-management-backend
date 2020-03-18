const express = require("express");
const attendanceSchema = require("../schemas/attendance_schema");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const configs = require("../config/config.json");
const utils = require("../utils/extract_token");
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
