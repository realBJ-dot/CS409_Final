const express = require('express');
const app = express();
const router = express.Router();
const createAccount = require('./routes/signupandlogin')
const loadUser = require('./routes/users')

router.use("/api",createAccount,loadUser);

module.exports = router;