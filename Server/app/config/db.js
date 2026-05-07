const mongoose = require('mongoose');

async function mogodbCon() {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            serverSelectionTimeoutMS: 10000,
            ssl: true,
        });
        console.log("Database Connected 🟢");
    } catch (err) {
        console.log("Database not Connected 🔴");
        console.log(err);
        throw err;
    }
}

module.exports = mogodbCon;