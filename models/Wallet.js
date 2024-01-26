const mongoose = require('mongoose')
const { Schema } = mongoose

const walletSchema = new Schema({
    user: String,
    balance: Number,
    incomes: Number,
    expenses: Number
})

const Wallet = mongoose.model("Wallet", walletSchema)

module.exports = Wallet