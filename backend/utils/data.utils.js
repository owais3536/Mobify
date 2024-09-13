const mongoose = require('mongoose');

async function connectDB() {
    const URL = process.env.DB_URL;

    try {
        await mongoose.connect(URL);
        console.log(`Database connected`);
    }
    catch (err) {
        console.log(`Faild to connect to database`);
        throw err.message;
    }
}

module.exports = {
    connectDB
};