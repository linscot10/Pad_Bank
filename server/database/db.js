const mongoose = require("mongoose")
const colors = require("colors")
require('dotenv').config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongodb is connected Succesfully !`.bgCyan.orange)

    } catch (error) {
        console.error(`problem connecting to the database ${error}`.bgRed.white)
        process.exit(1)
    }
}




module.exports = connectDB;