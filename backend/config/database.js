const mongoose = require('mongoose');

const connectMongoDB = async () => {
    try{
        await mongoose.connect(process.env.DB_URI)
        console.log(`MongoDB connected`);
    } catch(err){
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectMongoDB;
