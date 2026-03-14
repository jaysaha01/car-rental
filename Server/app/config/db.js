const mongoose = require('mongoose');

async function mogodbCon() {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Connected 🟢")
    }catch(err){
        console.log("Database not Connected 🔴")
        console.log(err)
    }
}

module.exports = mogodbCon