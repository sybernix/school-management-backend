const express = require("express");
const studentModel = require("../schemas/student_schema");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const keys = require("../config/key.json");

const router = express.Router();
const JWT_KEY = keys.JWT_KEY;

//Get all student details
router.get("/", function(req, res) {
  console.log('1111')
  studentModel.find(function(err, student) {
    if (err) {
      console.log(err);
    } else {
      res.json(student);
    }
  });
});

router.get("/:id", function(req, res) {
  let id = req.params.id;
  studentModel.findById(id, function(err, students) {
    res.json(students);
  });
});

//Add new student to db
router.post("/add", function(req, res) {
  studentModel.find({
    studentID: req.body.studentID
  })
    .exec()
    .then(student => {
      if (student.length >= 1) {
        res.status(409).json({
          message: "Student already exists"
        });
      } else {
        const studentModel = new studentModel({
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
});

//-----------------------------LOGIN--------------------

//login
router.post("/login", (req, res) => {
  console.log('222')
  console.log(req.body.studentID);
  Studentmodel.find({ studentID: req.body.studentID })
    .exec()
    .then(student => {
      console.log(student);
      if (student.length < 1) {
        return res.status(401).json({
          message: "Authorization Failed!"
        });
      }
      if (student) {
        //correct password
        const token = jwt.sign(
          {
            id: student[0]._id,
            studentID: student[0].studentID,
            userType: student[0].userType
          },
          JWT_KEY,
          {
            expiresIn: "1h"
          }
        );
        console.log(student);
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
router.post("/update/:id", function(req, res) {
  studentModel.findById(req.params.id, function(err, studentmodel) {
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
});

// Delete the student
router.delete("/delete/:id", function(req, res) {
  studentModel.findOneAndDelete({ _id: req.params.id }, function(
    err
  ) {
    if (err) res.json(err);
    else res.json("Successfully removed");
  });
});

module.exports = router;
