const express = require("express");
const router = express.Router();
const teacherSchema = require("../schemas/teacher_schema");
const utils = require("../utils/extract_token");
const configs = require("../config/config.json");

//login
router.post("/login", (req, res) => {
    console.log(req.body.instructorID);
    teacherSchema.find({instructorID: req.body.instructorID})
        .exec()
        .then(teacherList => {
            console.log(teacherList);
            if (teacherList.length < 1) {
                return res.status(401).json({
                    message: 'Authorization Failed!'
                });
            }
            if (teacherList && bcrypt.compareSync(req.body.password, teacherList[0].passwordHash)) {
                //correct password
                const token = jwt.sign({
                        id: teacherList[0]._id,
                        instructorID: teacherList[0].instructorID,
                        userType: teacherList[0].userType
                    },
                    configs.JWT_KEY_TEACHER,
                    {
                        expiresIn: "1h"
                    }
                );
                // console.log(instructorID);
                return res.status(200).json({
                    message: 'Authorization Success',
                    token: token
                });
            }
            res.status(401).json({
                message: 'Authorization Failed!'
            });
        }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
});

//Get all teachers
router.get("/",  utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_TEACHER, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            teacherSchema.find((err, instructor) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(instructor);
                }
            });
        }
    });
});

//Get Instructor By ID
router.get("/:id", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_TEACHER, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            let id = req.params.id;
            teacherSchema.findById(id, (err, instructor) => {
                res.json(instructor);
            });
        }
    });
});

//add new Instructor
router.post("/add", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_TEACHER, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            let instructormodel = new teacherSchema(req.body);
            instructormodel
                .save()
                .then(instructor => {
                    res.status(200).json({teacher: "instructor added successfully"});
                })
                .catch(err => {
                    res.status(400).send("adding new instructor failed");
                });
        }
    });
});

//Update instructor
router.post("/update/:id", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_TEACHER, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            teacherSchema.findById(req.params.id, (err, instructor) => {
                if (!instructor) {
                    res.status(404).send("data is not found");
                } else {
                    instructor.name = req.body.name;
                    instructor.mail = req.body.mail;
                    instructor.contactNumber = req.body.number;
                    instructor.dept = req.body.dept;
                    instructor.title = req.body.title;
                    instructor.password = req.body.password;

                    instructor
                        .save()
                        .then(instructor => {
                            res.json("instructor updated");
                        })
                        .catch(err => {
                            res.status(400).send("updated not successfully");
                        });
                }
            });
        }
    });
});

//instructor Delete
router.delete("/delete/:id", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_TEACHER, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            teacherSchema.findOneAndDelete(
                {_id: req.params.id},
                (err, instructor) => {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json("deleted successfully");
                    }
                }
            );
        }
    });
});

module.exports = router;
