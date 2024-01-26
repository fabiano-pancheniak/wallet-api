const Wallet = require("../models/Wallet")
const asyncHandler = require("express-async-handler")
require('dotenv').config()  

exports.getWallet = asyncHandler(async (req,res) => {       
    const wallets = await Wallet.find({})
    res.status(200).json({ wallets })   
})

exports.createWallet = asyncHandler(async (req, res) => {
    const wallet = await Wallet.create(req.body)
    res.status(201).json({wallet})
})




