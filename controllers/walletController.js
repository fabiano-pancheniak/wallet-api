const Wallet = require("../models/Wallet")
const asyncHandler = require("express-async-handler")
const mongoose = require('mongoose')
require('dotenv').config()  

exports.getWallet = asyncHandler(async (req,res) => {     
    const walletID = req.params.id
    let newBalance = 0
    console.log(req.user.userId)
    
    if(!mongoose.Types.ObjectId.isValid(walletID)){   
        return res.status(404).json({message: `Wallet not found`})
    }

    let wallet = await Wallet.findById({_id: walletID})

    
    if(!wallet){
        return res.status(404).json({message: `Wallet not found`})
    }

    wallet.operations.sort((a, b) => b.date - a.date);

    wallet.operations.forEach(item => {
        if(item.type === 'income'){
            newBalance += item.amount
        }
        if(item.type === 'expense'){
            newBalance -= item.amount
        }
    });

    wallet = await Wallet.findOneAndUpdate(
        { _id: walletID }, 
        { balance: newBalance },
        {new: true})
    return res.status(201).json({ wallet })
})

exports.createWallet = asyncHandler(async (req, res) => {
    const wallet = await Wallet.create(req.body)
    res.status(201).json({wallet})
})


exports.updateOperation = asyncHandler(async(req,res) => {
    const walletID = req.params.id
    let newBalance = 0
    let wallet = await Wallet.findById(walletID)

    if(req.body.type === 'income'){
        newBalance = wallet.balance + req.body.amount
    }
    if(req.body.type === 'expense'){
        newBalance = wallet.balance - req.body.amount
    }

    if(!wallet){
        return res.status(404).json({message: `wallet ${walletID} not found`})
    }

    let updatedWallet = await Wallet.findOneAndUpdate(
        { _id: walletID }, 
        {   balance: newBalance,
            $push: { 
                  operations: {
                        amount: req.body.amount,
                        type: req.body.type,
                        date: req.body.date,
                        category: req.body.category
                    }  
                } 
        },
        {new: true})
    return res.status(201).json(updatedWallet)

})

exports.createCustomCategory = asyncHandler(async(req,res) => {
    const walletID = req.params.id

    let wallet = await Wallet.findOneAndUpdate(
        { _id: walletID }, 
        {  $push: { 
                customCategories: {
                    type: req.body.type,
                    description: req.body.description
                }  
            } 
        },
        {new: true})

        if(!wallet){
            return res.status(404).json({message: `wallet ${walletID} not found`})
        }

        return res.status(201).json(wallet)

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
