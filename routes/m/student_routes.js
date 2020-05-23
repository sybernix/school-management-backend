const express = require("express");
const studentSchema = require("../../schemas/m/student_schema");
const authSchema = require("../../schemas/auth_schema");
const tokenSchema = require("../../schemas/token_schema");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const utils = require("../../utils/util_methods");
const constants = require("../../utils/constants");

const router = express.Router();

//Get all student details
router.post("/retrieve", utils.extractToken, (req, res) => {
  tokenSchema
    .find({ token: req.token })
    .exec()
    .then((resultList) => {
      if (resultList.length < 1) {
        return res.status(401).json({
          message: "Invalid Token",
        });
      }
      studentSchema.find(function (err, student) {
        if (err) {
          console.log(err);
        } else {
          res.json(student);
        }
      });
    });
});

router.post("/retrieve/:id", utils.extractToken, (req, res) => {
  tokenSchema
    .find({ token: req.token })
    .exec()
    .then((resultList) => {
      if (resultList.length < 1) {
        return res.status(401).json({
          message: "Invalid Token",
        });
      }
      let id = req.params.id;
      studentSchema
        .find({ _id: id })
        .exec()
        .then((studentList) => {
          if (studentList.length < 1) {
            return res.status(401).json({
              message: "ID not found!",
            });
          }
          if (studentList) {
            res.json(studentList[0]);
          }
        });
    });
});

// Retrieve admin  by ID
router.post("/retrieveList", utils.extractToken, (req, res) => {
    tokenSchema
        .find({ token: req.token })
        .exec()
        .then((resultList) => {
            if (resultList.length < 1) {
                return res.status(401).json({
                    message: "Invalid Token",
                });
            }
            console.log(req.body.list);
            // let id = req.params.id;
            studentSchema
                .find({ _id : { $in : req.body.list } })
                .exec()
                .then((resultList) => {
                    if (resultList.length < 1) {
                        return res.status(401).json({
                            message: "ID not found!",
                        });
                    }
                    if (resultList) {
                        res.json(resultList);
                    }
                });
        });
});

//Add new student to db
router.post("/add", utils.extractToken, (req, res) => {
  studentSchema.find(
    { $or: [{ nic: req.body.nic }, { phone: req.body.phone }] },
    function (err, matchingStudents) {
      if (matchingStudents.length >= 1) {
        res.status(409).json({
          message: "Student already exists",
        });
      } else {
        const hash = bcrypt.hashSync(req.body.password, 8);
        const newObjectID = mongoose.Types.ObjectId();
        const studentModel = new studentSchema({
          _id: newObjectID,
          user_type: constants.USER_TYPE_STUDENT,
          user_type_id: req.body.user_type_id,
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
        });
        const authModel = new authSchema({
          user_id: newObjectID,
          nic: req.body.nic,
          phone: req.body.phone,
          user_type: constants.USER_TYPE_STUDENT,
          password_hash: hash,
        });
        authModel.save().catch((err) => {
          console.log(err.message);
          res.status(500).json({
            error: err,
          });
        });
        studentModel
          .save()
          .then((result) => {
            console.log(result);
            res.status(201).json({
              message: "student added",
              createdStudent: result,
            });
          })
          .catch((err) => {
            console.log(err.message);
            res.status(500).json({
              error: err,
            });
          });
      }
    }
  );
});

//Update the student details
router.post("/update/:id", utils.extractToken, (req, res) => {
  tokenSchema
    .find({ token: req.token })
    .exec()
    .then((resultList) => {
      if (resultList.length < 1) {
        return res.status(401).json({
          message: "Invalid Token",
        });
      }
      studentSchema
        .update({ _id: req.params.id }, req.body)
        .then((result) => {
          res.status(200).json({
            message: "Updated successfully",
            createdParent: result,
          });
        })
        .catch((err) => {
          res.status(400).json({
            message: "Updating failed",
            error: err,
          });
        });
    });
});

// Delete the student
router.delete("/delete/:id", utils.extractToken, (req, res) => {
  tokenSchema
    .find({ token: req.token })
    .exec()
    .then((resultList) => {
      if (resultList.length < 1) {
        return res.status(401).json({
          message: "Invalid Token",
        });
      }
      studentSchema.findOneAndDelete({ _id: req.params.id }, function (err) {
        if (err) res.json(err);
        else res.json("Successfully removed");
      });
    });
});

router.post("/find", (req, res) => {
  var name = req.body.name;
  var query = {};
  query[name] = { $regex: req.body.value };
  studentSchema
    .find(query)
    .exec()
    .then((resultList) => {
      if (resultList) {
        res.json(resultList);
      }
    });
});

module.exports = router;
