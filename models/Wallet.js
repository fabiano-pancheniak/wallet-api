const mongoose = require('mongoose')
const { Schema } = mongoose

const walletSchema = new Schema({
    user: String,
    balance: Number,
    operations: [{
        type: {type: String},
        amount: Number,
        date: {
            type: Date,
            default: Date.now()
        }
    }]
})

const Wallet = mongoose.model("Wallet", walletSchema)

module.exports = Wallet