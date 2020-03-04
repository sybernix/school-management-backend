const express = require("express");
const router = express.Router();
const teacherModel = require("../schemas/teacher_schema");

router.get("/test", (req, res) => res.json({msg: "instructor Works"}));

//login
router.post("/login", (req, res) => {
    console.log(req.body.instructorID);
    teacherModel.find({instructorID: req.body.instructorID})
        .exec()
        .then(inst => {
            console.log(inst);
            if (inst.length < 1) {
                return res.status(401).json({
                    message: 'Authorization Failed!'
                });
            }
            if (inst) {
                //correct password
                const token = jwt.sign({
                        id: inst[0]._id,
                        instructorID: inst[0].instructorID,
                        userType: inst[0].userType
                    },
                    JWT_KEY,
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

//
router.get("/all", (req, res) => {
    teacherModel.find((err, instructor) => {
        if (err) {
            console.log(err);
        } else {
            res.json(instructor);
        }
    });
});

//Get Instructor By ID
router.get("/edit/:id", (req, res) => {
    let id = req.params.id;
    teacherModel.findById(id, (err, instructor) => {
        res.json(instructor);
    });
});

//add new Instructor
router.post("/add", (req, res) => {
    let instructormodel = new teacherModel(req.body);

    instructormodel
        .save()
        .then(instructor => {
            res.status(200).json({teacher: "instructor added successfully"});
        })
        .catch(err => {
            res.status(400).send("adding new instructor failed");
        });
});

//Update instructor
router.post("/update/:id", (req, res) => {
    teacherModel.findById(req.params.id, (err, instructor) => {
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
});

//instructor Delete
router.delete("/delete/:id", (req, res) => {
    teacherModel.findOneAndDelete(
        {_id: req.params.id},
        (err, instructor) => {
            if (err) {
                res.json(err);
            } else {
                res.json("deleted successfully");
            }
        }
    );
});

module.exports = router;
