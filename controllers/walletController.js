const Wallet = require("../models/Wallet")
const asyncHandler = require("express-async-handler")
const mongoose = require('mongoose')
require('dotenv').config()  

exports.getWallet = asyncHandler(async (req,res) => {     
    const walletID = req.params.id
    
    if(!mongoose.Types.ObjectId.isValid(walletID)){   
        return res.status(404).json({message: `Wallet not found`})
    }

    const wallet = await Wallet.findById({_id: walletID})
    
    if(!wallet){
        return res.status(404).json({message: `Wallet not found`})
    }

    res.status(200).json({ wallet })   
})

exports.createWallet = asyncHandler(async (req, res) => {
    const wallet = await Wallet.create(req.body)
    res.status(201).json({wallet})
})


exports.updateOperation = asyncHandler(async(req,res) => {
    const walletID = req.params.id
    let wallet = await Wallet.findById(walletID)

    if(!wallet){
        return res.status(404).json({message: `wallet ${walletID} not found`})
    }

    let updatedWallet = await Wallet.findOneAndUpdate(
        { _id: walletID }, 
        { $push: { 
                  operations: {
                        amount: req.body.amount,
                        type: req.body.type,
                        date: req.body.date
                    }  
                } 
        },
        {new: true})
        return res.status(201).json(updatedWallet)

})

exports.removeOperation = asyncHandler(async(req,res) => {
    const walletID = req.params.id
    const operationID = req.params.operationID

    const wallet = await Wallet.findOneAndUpdate(
        { _id: walletID },
        { $pull: { operations: { _id: operationID } } },
        { new: true }
      );

    return res.status(200).json(wallet)
})
