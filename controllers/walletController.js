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


exports.updateIncomeOrExpense = asyncHandler(async(req,res) => {
    const walletID = req.params.id
    let wallet = await Wallet.findById(walletID)
    const incomeOrExpense = req.originalUrl.split('/').slice(-1)

    if(!wallet){
        return res.status(404).json({message: `wallet ${walletID} not found`})
    }

    //Repetição de código
    if(incomeOrExpense[0] === 'income'){
        let updatedWallet = await Wallet.findOneAndUpdate(
            { _id: walletID }, 
            { $push: { 
                      incomes: {
                        "amount": req.body.amount
                        }  
                    } 
            },
            {new: true})
            return res.status(201).json(updatedWallet)
    }
    
    if(incomeOrExpense[0] === 'expense'){
        let updatedWallet = await Wallet.findOneAndUpdate(
            { _id: walletID }, 
            { $push: { 
                      expenses: {
                        "amount": req.body.amount
                        }  
                    } 
            },
            {new: true})
            return res.status(201).json(updatedWallet)
    }
})


exports.removeIncome = asyncHandler(async(req,res) => {
    const walletID = req.params.id
    const incomeID = req.params.incomeID

    await Wallet.findOneAndUpdate(
        { _id: walletID },
        { $pull: { incomes: { _id: incomeID } } },
        { new: true }
      );

    return res.status(200).send()
})

exports.removeExpense = asyncHandler(async(req,res) => {
    const walletID = req.params.id
    const expenseID = req.params.expenseID

    await Wallet.findOneAndUpdate(
        { _id: walletID },
        { $pull: { expenses: { _id: expenseID } } },
        { new: true }
      );

    return res.status(200).send()
})






