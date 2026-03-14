const { varifyToken } = require("../helper/jwtoken")
const user = require('../models/user.model')

async function authMiddleware(req, res, next) {
    const mytoken = req.cookies.token;
    if(!mytoken){
         res.json({
            "message": "Please login your account",
        })
    }
    let decoedToken = await varifyToken(mytoken)
    let userFindDb = await user.findOne({ "email": decoedToken.email })
    if (userFindDb) {
        req.loginUser = userFindDb
        next()
    } else {
        res.json({
            "message": "Unzuthorized",
        })
    }
}

module.exports = authMiddleware