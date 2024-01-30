const express = require("express")
const router = express.Router()
const {getWallet, createWallet, updateIncomeOrExpense, removeIncome, removeExpense} = require("../controllers/walletController")

router.route("/")
    .post(createWallet)

router.route("/:id")
    .get(getWallet)

router.route("/:id/income")
    .post(updateIncomeOrExpense)
    
router.route("/:id/income/:incomeID")
    .patch(removeIncome)

router.route("/:id/expense")
    .post(updateIncomeOrExpense)

router.route("/:id/expense/:expenseID")
    .patch(removeExpense)

module.exports = router