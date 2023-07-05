const mongoose = require("mongoose")
const colors = require("colors")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Database connected ${mongoose.connection.host}`.bgGreen.white)
    } catch (error) {
        console.log(`MongoDB Database error ${error}`.bgRed.white);
    }
}

module.exports = connectDB