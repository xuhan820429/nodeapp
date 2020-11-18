const bcrypt = require('bcrypt');

class PasswordService {
    constructor() {
    }
    hashPassword(password) {
        let salt = bcrypt.genSaltSync()
        let hashed = bcrypt.hashSync(password, salt)
        return hashed
    }

    verifyPassword(origin, hashed) {
        return bcrypt.compareSync(origin, hashed)
    }
}

module.exports = new PasswordService()