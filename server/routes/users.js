var { User } = require('../models/signUpTemplate')
const express = require('express');
const app = express()
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/current_user_info", (req, res) => {
    //console.log(req.headers.authorization)
    if (!(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')) {
        return res.status(403).send({
            message: "Authentication failed"
        });
    }
    const token = req.headers.authorization.split(' ')[1];
    //console.log(token)
    try {
        jwt.verify(token, process.env.JWTPRIVATEKEY);
    } catch {
        //console.log("here")
        return res.status(403).send({
            message: "Authentication failed"
        });
    }
    const userId = jwt.verify(token, process.env.JWTPRIVATEKEY)._id;
    User.findById(userId)
    .exec()
        .then(user => {
            if (user) {
                return res.status(200).send({
                    message: 'Users Retrieved',
                    data: user
                });
            } else {
                return res.status(404).send({
                    message: 'User Not Found',
                    data: userId
                });
            }
        })
        .catch(err => {
            return res.status(500).send({
                message: 'Server Error',
                data: []
            });
        });
  });


module.exports = router;