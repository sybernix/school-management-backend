const express = require("express");
const router = express.Router();
const parentSchema = require("../schemas/parent_schema");
const utils = require("../utils/extract_token");
const configs = require("../config/config.json");

//login
router.post("/login", (req, res) => {
    console.log(req.body.parentID);
    parentSchema.find({parentID: req.body.parentID})
        .exec()
        .then(parentList => {
            console.log(parentList);
            if (parentList.length < 1) {
                return res.status(401).json({
                    message: 'Authorization Failed!'
                });
            }
            if (parentList && bcrypt.compareSync(req.body.password, parentList[0].passwordHash)) {
                //correct password
                const token = jwt.sign({
                        id: parentList[0]._id,
                        parentID: parentList[0].parentID
                    },
                    configs.JWT_KEY_PARENT,
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

//Get all parents
router.get("/",  utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_PARENT, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            parentSchema.find((err, parents) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(parents);
                }
            });
        }
    });
});

//Get parent By ID
router.get("/:id", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_PARENT, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            let id = req.params.id;
            parentSchema.findById(id, (err, parent) => {
                res.json(parent);
            });
        }
    });
});

//add new parent
router.post("/add", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_PARENT, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            let parentModel = new parentSchema(req.body);
            parentModel
                .save()
                .then(parent => {
                    res.status(200).json({teacher: "New parent added successfully"});
                })
                .catch(err => {
                    res.status(400).send("Adding new parent failed");
                });
        }
    });
});

//Update parent
router.post("/update/:id", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_PARENT, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            parentSchema.findById(req.params.id, (err, parent) => {
                if (!parent) {
                    res.status(404).send("data is not found");
                } else {
                    const  hash = bcrypt.hashSync(req.body.password, 8);
                    parent.name = req.body.name;
                    parent.parentID = req.body.parentID;
                    parent.email = req.body.email;
                    parent.passwordHash = hash;

                    parent
                        .save()
                        .then(parent => {
                            res.json("Parent updated");
                        })
                        .catch(err => {
                            res.status(400).send("Parent update not successful");
                        });
                }
            });
        }
    });
});

//parent Delete
router.delete("/delete/:id", utils.extractToken, (req, res) => {
    jwt.verify(req.token, configs.JWT_KEY_PARENT, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            parentSchema.findOneAndDelete(
                {_id: req.params.id},
                (err, parent) => {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json("Parent deleted successfully");
                    }
                }
            );
        }
    });
});

module.exports = router;