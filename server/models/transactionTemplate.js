const mongoose = require('mongoose');

//template for all kinds of transaction
const transactionTemplate = new mongoose.Schema({
    assignedUser: {
        type: String,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: true
    }, 
    dateCreated: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    }
},
{
  versionKey: false,
})
module.exports = mongoose.model('transactions', transactionTemplate);