const mongoose = require("mongoose");

module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try {
        mongoose.connect(process.env.DATABASE_ACCESS, connectionParams);
        console.log("Database is ready");
    }catch(err){
        console.log(err);
        console.log("Database is not connecting. Please check again")
    }
}