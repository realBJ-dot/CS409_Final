const mongoose = require('mongoose');

//template for all kinds of transaction
const transactionTemplate = new mongoose.Schema({
    UserName : {
        type: String,
        //required : true
    },
    Personal : {
        type: Number,
        //required : true
    },
    BillsUtilities : {
        type: Number,
        //required : true
    },
    Groceries : {
        type: Number,
        //required : true
    },
    Travel : {
        type: Number,
        //required : true
    },
    FoodDrink : {
        type: Number,
        //required : true
    },
    Cashout : {
        type: Number,
        //required : true
    },
    Entertainment : {
        type: Number,
        //required : true
    },
    Shopping : {
        type: Number,
        //required : true
    },
    Gas : {
        type: Number,
        //required : true
    },
    HealthWellness : {
        type: Number,
        //required : true
    },
})
module.exports = mongoose.model('transactions', transactionTemplate);