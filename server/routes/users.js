var {User} = require('../models/signUpTemplate')
const express = require('express');
const app = express()
const router = express.Router();

router.get("/users", (req, res) => {
    console.log("User Info");
    User.find(eval("(" + req.query.where + ")"))
    .exec()
        .then(function (data) {
            if(req.query.count) {
                return res.status(200).send({
                    message: 'Users Retrieved',
                    data: data.length
                });
            } else {
                return res.status(200).send({
                    message: 'Users Retrieved',
                    data: data
                });
            }
        })
        .catch(function (error) {
            return res.status(500).send({
                message: 'Server Error',
                data: []
            });
        });
  });


module.exports = router;