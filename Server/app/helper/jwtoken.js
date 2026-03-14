var jwt = require('jsonwebtoken');

async function tokenCreation(email, pass) {
    var token = await jwt.sign({ email: email, password: pass }, process.env.SECRET_KEY_TOKEN);
    return token
}

async function varifyToken(token) {
    var decoded = jwt.verify(token, process.env.SECRET_KEY_TOKEN);
    return decoded
}

module.exports = { tokenCreation, varifyToken }

