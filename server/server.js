const express = require('express');
const app = express()
const connection = require("./dbconnection.js")
const dotenv = require('dotenv');
const routes = require('./routes')
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;

dotenv.config();

connection();



app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
};
app.use(allowCrossDomain);

app.use("/", routes)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})