const express = require("express");
const router = express.Router();
const edQualificationSchema = require("../../schemas/df/ed_qualification_schema");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const utils = require("../../utils/extract_token");
const configs = require("../../config/config.json");
const constants = require("../../utils/constants");

router.post("/retrieve", (req, res) => {
    edQualificationSchema.find()
        .skip(req.body.skip)
        .limit(req.body.limit)
        .then(results => {
            res.json(results);
        })
});

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
                message: "Added successfully",
                createdParent: result
            });
        })
        .catch(err => {
            res.status(400).json({
                message: "Adding new failed",
                error: err
            });
        });
});

router.post("/update/:id", (req, res) => {
    edQualificationSchema.update({id: req.params.id}, req.body)
        .then(result => {
            res.status(200).json({
                message: "Updated successfully",
                createdParent: result
            });
        })
        .catch(err => {
            res.status(400).json({
                message: "Updating failed",
                error: err
            });
        });
});

router.post("/delete/:id", (req, res) => {
    edQualificationSchema.findOneAndDelete(
        {id: req.params.id},
        (err, result) => {
            if (err) {
                res.json(err);
            } else {
                res.json("Deleted successfully");
            }
        }
    );
});

module.exports = router;
