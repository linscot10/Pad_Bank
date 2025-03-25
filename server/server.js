const express = require("express");
const cors = require("cors")
const colors = require("colors")
const morgan = require("morgan")
// const path = require('path')


require("dotenv").config()
const connectDB = require("./database/db")
const testRouter = require('./routes/test-route')
const authRoutes = require("./routes/auth-route")
const inventoryRoute = require("./routes/inventory-routes")
const analyticsRoute = require("./routes/analyticsRoute")
const adminRoutes = require("./routes/adminRoutes")
const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

// app.use(express.static(path.join(__dirname, "../client/frontend/build")));

// app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname, "../client/frontend/build/index.html"))
// })

PORT = process.env.PORT || 4000
connectDB()

app.use("/api/", testRouter)
app.use("/api/auth", authRoutes)
app.use("/api/inventory", inventoryRoute)
app.use("/api/analytics", analyticsRoute)
app.use("/api/admin", adminRoutes)


app.listen(PORT, () => {
    console.log(`Server started in ${process.env.DEV_MODE}mode on port http://localhost:${PORT}`.bgBlue.white)
})