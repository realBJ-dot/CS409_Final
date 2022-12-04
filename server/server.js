const express = require('express');
const app = express()
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routeUrl = require('./routes/route');
const cors = require('cors');

dotenv.config();
mongoose.connect(process.env.DATABASE_ACCESS, () => console.log('database connected'));

app.get("/api", (req,res) => {
    res.json({"users" : ["User 1", "User 2", "User 3"]});
});

app.use(express.json());
app.use(cors());
app.use('/app', routeUrl);

app.listen(3001, () => {
    console.log("Server is running on port 3001");
})