const bcrypt = require('bcrypt');

async function hassingPassword(password) {
    const saltRounds = 10;
    const myhastedPassowd =  await bcrypt.hash(password, saltRounds);
    return myhastedPassowd
}

async function comparePassword(password, hash) {
    let coparePassword=  await bcrypt.compare(password, hash);
    return coparePassword
}

module.exports = { hassingPassword, comparePassword }

