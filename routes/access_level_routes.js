const express = require("express");
const router = express.Router();
const accessLevelSchema = require("../schemas/access_level_schema");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const utils = require("../utils/extract_token");
const configs = require("../config/config.json");
const constants = require("../utils/constants");

//Get all access level
router.post("/retrieve", (req, res) => {
    accessLevelSchema.find((err, accessLevels) => {
        if (err) {
            console.log(err);
        } else {
            res.json(accessLevels);
        }
    });
});

//Get access level By ID
router.post("/retrieve/:id", (req, res) => {
    let id = req.params.id;
    accessLevelSchema.find({id: id})
        .exec()
        .then(accessLevels => {
            if (accessLevels.length < 1) {
                return res.status(401).json({
                    message: "Authorization Failed!"
                });
            }
            if (accessLevels) {
                res.json(accessLevels[0]);
            }
        })
});

//add new access level
router.post("/add", (req, res) => {
    let accessLevelModel = new accessLevelSchema({
        _id: mongoose.Types.ObjectId(),
        id: req.body.id,
        level: req.body.level,
        is_admin: req.body.is_admin,
        created_date: req.body.created_date,
        is_active: req.body.is_active,
    });
    accessLevelModel
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
    accessLevelSchema.findOneAndDelete(
        {id: req.params.id},
        (err, accessLevel) => {
            if (err) {
                res.json(err);
            } else {
                res.json("Access Level deleted successfully");
            }
        }
    );
});

module.exports = router;
