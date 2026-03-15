const user = require("../models/user.model")
const authValidator = require("../helper/validateauthdata")
const { hassingPassword, comparePassword } = require("../helper/encription")
const { tokenCreation } = require("../helper/jwtoken")

class authController {
    async createAccount(req, res) {
        try {
            authValidator(req, res)
            const { name, email, password, phone, usertype } = req.body
            let findUser = await user.find({ "email": email })
            if (findUser.length == 0) {
                let hasedPassword = await hassingPassword(password)
                let userData = { "name": name, "email": email, "password": hasedPassword, "phone": phone, "usertype": usertype }
                const userCreated = new user(userData);
                let myseavedData = await userCreated.save();
                res.json({
                    "message": "User Created Successfully",
                    data: myseavedData
                })
            } else {
                res.json({
                    "message": "User Already Created",
                })
            }

        } catch (err) {
            console.log(err)
            res.json({
                "message": "User Creation Faild",
            })
        }
    }

    async loginAccount(req, res) {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                res.json({
                    "message": "Please fill all the fields !"
                })
            }
            const findUser = await user.findOne({ "email": email })
            if (findUser == null) {
                res.json({
                    "message": "User not exsist!"
                })
            } else {
                const compare = await comparePassword(password, findUser.password)
                if (compare) {
                    let token = await tokenCreation(email, password)
                    res.cookie('token', token)
                    res.cookie('role', findUser.usertype)
                    res.json({
                        "message": "login Successfull !",
                        "data": findUser,
                        "token": token
                    })
                } else {
                    res.json({
                        "message": "Please Provide Currect Password !",
                    })
                }
            }
        } catch (err) {
            res.json({
                "message": "login Faild. Try Again!"
            })

        }
    }

    async myProfile(req, res) {
        try {
            let lginUser = req.loginUser
            res.json({
                "message": "Profile Fetched Successfully !",
                "data": lginUser
            })

        } catch (err) {
            console.log(err)
            res.json({
                "message": "Profile Fetched Failed!"
            })
        }
    }

    async updateAccount(req, res) {
        try {
            let submittedData = req.body
            let submitData = Object.keys(submittedData)
            let notAllowed = ["email", "password"]

            if (submitData.includes(notAllowed) === false) {
                let lginUser = req.loginUser
                let updateMyprofile = await user.findOneAndUpdate({ email: lginUser?.email }, { $set: { name: req?.body?.name } }, { returnDocument: "after" })
                res.json({
                    "message": "Profile Update Successfully !",
                    'data': updateMyprofile
                })
            } else {
                res.json({
                    "message": "Faild to update, Please update only your Name!"
                })
            }
        } catch (err) {
            console.log(err)
            res.json({
                "message": "Faild to update my profile !"
            })
        }
    }

    async logoutProfile(req, res) {
        try {
            res.cookie("token", null, {
                expires: new Date(Date.now())
            })
            res.cookie("role", null)
            res.send()
        } catch (err) {

        }
    }

}

module.exports = new authController