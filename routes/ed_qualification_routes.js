const express = require("express");
const router = express.Router();
const edQualificationSchema = require("../schemas/ed_qualification_schema");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const utils = require("../utils/extract_token");
const configs = require("../config/config.json");
const constants = require("../utils/constants");

//Get all access level
router.post("/retrieve", (req, res) => {
    edQualificationSchema.find((err, resultList) => {
        if (err) {
            console.log(err);
        } else {
            res.json(resultList);
        }
    });
});

//Get access level By ID
router.post("/retrieve/:id", (req, res) => {
    let id = req.params.id;
    edQualificationSchema.find({id: id})
        .exec()
        .then(resultList => {
            if (resultList.length < 1) {
                return res.status(401).json({
                    message: "Authorization Failed!"
                });
            }
            if (resultList) {
                res.json(resultList[0]);
            }
        })
});

//add new access level
router.post("/add", (req, res) => {
    let edQualificationModel = new edQualificationSchema({
        _id: mongoose.Types.ObjectId(),
        id: req.body.id,
        qualification: req.body.qualification,
        sort_order: req.body.sort_order
    });
    edQualificationModel
        .save()
        .then(result => {
            res.status(200).json({
                message: "New access level added successfully",
                createdParent: result
            });
        })
        .catch(err => {
            res.status(400).json({
                message: "Adding new access level failed",
                error: err
            });
        });
});

// Delete access level
router.post("/delete/:id", (req, res) => {
    edQualificationSchema.findOneAndDelete(
        {id: req.params.id},
        (err, result) => {
            if (err) {
                res.json(err);
            } else {
                res.json("Access Level deleted successfully");
            }
        }
    );
});

module.exports = router;
