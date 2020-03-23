const express = require("express");
const router = express.Router();
const teacherSchema = require("../schemas/teacher_schema");
const utils = require("../utils/extract_token");
const configs = require("../config/config.json");

//login
router.post("/login", (req, res) => {
    console.log(req.body.teacherID);
    teacherSchema.find({teacherID: req.body.teacherID})
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
                        teacherID: teacherList[0].teacherID,
                        userType: teacherList[0].userType
                    },
                    configs.JWT_KEY_TEACHER,
                    {
                        expiresIn: "1h"
                    }
                );
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
            teacherSchema.find((err, teacher) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(teacher);
                }
            });
        }
    });
});

//Get teacher By ID
router.get("/:id", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_TEACHER, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            let id = req.params.id;
            teacherSchema.findById(id, (err, teacher) => {
                res.json(teacher);
            });
        }
    });
});

//add new teacher
router.post("/add", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_TEACHER, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            let instructormodel = new teacherSchema(req.body);
            instructormodel
                .save()
                .then(teacher => {
                    res.status(200).json({teacher: "New teacher added successfully"});
                })
                .catch(err => {
                    res.status(400).send("Adding new teacher failed");
                });
        }
    });
});

//Update teacher
router.post("/update/:id", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_TEACHER, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            teacherSchema.findById(req.params.id, (err, teacher) => {
                if (!teacher) {
                    res.status(404).send("Data is not found");
                } else {
                    teacher.name = req.body.name;
                    teacher.mail = req.body.mail;
                    teacher.contactNumber = req.body.number;
                    teacher.dept = req.body.dept;
                    teacher.title = req.body.title;
                    teacher.password = req.body.password;

                    teacher
                        .save()
                        .then(teacher => {
                            res.json("Teacher updated");
                        })
                        .catch(err => {
                            res.status(400).send("Updated not successful");
                        });
                }
            });
        }
    });
});

//teacher Delete
router.delete("/delete/:id", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_TEACHER, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            teacherSchema.findOneAndDelete(
                {_id: req.params.id},
                (err, teacher) => {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json("Deleted successfully");
                    }
                }
            );
        }
    });
});

module.exports = router;
