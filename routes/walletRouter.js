const express = require("express")
const router = express.Router()
const {getWallet, createWallet} = require("../controllers/walletController")

router.route("/")
    .get(getWallet)
    .post(createWallet)

router.route("/:id")

module.exports = router