const express = require("express")
const walletRouter = require("./routes/walletRouter")
const authRouter = require('./routes/auth');
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
const authenticateUser = require('./middleware/authentication');

app.use("/api/auth", authRouter)
app.use("/api/wallet", authenticateUser ,walletRouter)


const start = async (req, res) => {
    try {
        await mongoose.connect(process.env.CONN)
        app.listen(port, () => {
            console.log(`server running at port ${port}`)
        })
    } catch (error) {
        res.send({message: 'Falha na conexão com a base de dados'})
    }
}

start()