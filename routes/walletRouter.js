const express = require("express")
const router = express.Router()
const {getWallet, createWallet, updateOperation, removeOperation} = require("../controllers/walletController")

router.route("/")
    .post(createWallet)

router.route("/:id")
    .get(getWallet)

router.route("/:id/operation")
    .patch(updateOperation)
    
router.route("/:id/operation/:operationID")
    .patch(removeOperation)

module.exports = router