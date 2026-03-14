const express = require('express')
const app = express()
const dbCon = require('./app/config/db')
var cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 4000
var cookieParser = require('cookie-parser')
const authRouter = require("./app/routers/auth.router")
const ownerRouter = require("./app/routers/owner.router")
const adminRouter = require("./app/routers/admin.router")
const renterRouter = require('./app/routers/renter.router')

app.use(cookieParser())

app.use(cors({
  origin: 'https://car-rental-eta-bice.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


app.get('/', (req, res) => {
    res.send('Welcome to Car Renter System!')
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/auth", authRouter)
app.use("/api", ownerRouter)
app.use("/api", adminRouter)
app.use("/api", renterRouter)

dbCon().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port http://localhost:${port}`)
    })
}).catch((err) => {
    console.log("Database not connected❌", err)
})

