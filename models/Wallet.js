const mongoose = require('mongoose')
const { Schema } = mongoose

const walletSchema = new Schema({
    userID: String,
    balance: {type: Number, default: 0},
    operations: [{
        type: {type: String},
        amount: Number,
        date: {
            type: Date,
            default: new Date()
        },
        category: String
    }],
    customCategories: [{
        type: {type: String},
        description: String
        }
    ]
})

const Wallet = mongoose.model("Wallet", walletSchema)

module.exports = Wallet