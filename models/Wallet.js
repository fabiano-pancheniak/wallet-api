const mongoose = require('mongoose')
const { Schema } = mongoose

const walletSchema = new Schema({
    user: String,
    balance: Number,
    incomes: [{
        amount: Number,
        date: {
            type: Date,
            default: Date.now()
        }
    }],
    expenses: [{
        amount: Number,
        date: {
            type: Date,
            default: Date.now()
        }
    }]
})

const Wallet = mongoose.model("Wallet", walletSchema)

module.exports = Wallet