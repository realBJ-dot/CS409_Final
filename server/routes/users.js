var { User } = require('../models/signUpTemplate')
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


  router.delete("/users/:id", async (req, res) => {
    if (!(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')) {
        return res.status(403).send({
            message: "Authentication failed"
        });
    }
    const token = req.headers.authorization.split(' ')[1];
    const { schemaValidationError } = validate(req.body);
    if (schemaValidationError) {
        return res.status(400).send({
            message: error.details[0].message
        });
    }
    try {
        jwt.verify(token, process.env.JWTPRIVATEKEY);
    } catch {
        return res.status(403).send({
            message: "Authentication failed"
        });
    }
    const userId = jwt.verify(token, process.env.JWTPRIVATEKEY)._id;
    try {
        User.findByIdAndDelete(req.params._id, function(err, deletedUser) {
            if (err) {
                res.status(404).send({
                    message: "cannot user task to delete",
                    data: {}
                });
            }
            else {
                res.status(200).send({
                    message: "User deleted",
                    data: deletedUser
                });
            }
        });
    } catch {
        return res.status(500).send({ 
            message: "Internal server error. Failed to create transaction"
        });
    }
});  

module.exports = router;