const Wallet = require("../models/Wallet")
const asyncHandler = require("express-async-handler")
const mongoose = require('mongoose')
require('dotenv').config()  

exports.getWallet = asyncHandler(async (req,res) => {     
    const userID = req.params.id
    let newBalance = 0
    console.log(req.user.userId)
    
    if(!mongoose.Types.ObjectId.isValid(userID)){   
        return res.status(404).json({message: `Wallet not found`})
    }

    let wallet = await Wallet.findOne({userID: userID})

    if(!wallet){
        wallet = await Wallet.create({userID: userID, balance: 0})
    }

    if(wallet.operations.length != 0){
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
            { userID: userID }, 
            { balance: newBalance },
            {new: true})
    }
            
    if(!wallet){
        return res.status(404).json({message: `Wallet not found`})
    }

    return res.status(201).json({ wallet })
})

exports.createWallet = asyncHandler(async (req, res) => {
    const wallet = await Wallet.create(req.body)
    res.status(201).json({wallet})
})


exports.updateOperation = asyncHandler(async(req,res) => {
    const userID = req.params.id
    let newBalance = 0
    let wallet = await Wallet.findOne({userID: userID})

    if(req.body.type === 'income'){
        newBalance = wallet.balance + req.body.amount
    }
    if(req.body.type === 'expense'){
        newBalance = wallet.balance - req.body.amount
    }

    if(!wallet){
        return res.status(404).json({message: `wallet ${userID} not found`})
    }

    let updatedWallet = await Wallet.findOneAndUpdate(
        { userID: userID }, 
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
