var validator = require('validator');

function validateAuthData(req, res) {

    const {name, email, password,phone, usertype} = req.body

    if (!name || !email || !password || !phone || !usertype) {
        return res.json({
            "message": "Please Fill all the fields"
        })
    }

    if(!validator.isEmail(email)){
        return res.json({
            "message": "Please provide proper email"
        })
    }

    if(!validator.isStrongPassword(password)){
        return res.json({
            "message": "Please provide proper password like this : minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, "
        })
    }

    if(!validator.isMobilePhone(phone)){
        return res.json({
            "message": "Please provide proper Phone Number."
        })
    }
}

module.exports = validateAuthData