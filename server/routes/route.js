const express = require('express');
const router = express.Router();
const signUpTemplateCopy = require('../models/signUpTemplate');
const transactionTemplate = require('../models/transactionTemplate');

router.post('/signup', (req, res) => {
    const user = new signUpTemplateCopy({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : req.body.password
    })
    user.save()
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    })
})
router.get('/signup', (req, res) => {
    
})

module.exports = router;