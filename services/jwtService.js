const jwt = require('jsonwebtoken')

class JWTService {
    constructor() {
        this._secret = "this is default secret"
        this._jwt_max_age = 3 * 24 * 60 * 60 //3days
        this._cookie_max_age = 3 * 24 * 60 * 60 * 1000 //3days
    }

    set secret(v) {
        this._secret = v
    }
    set jwt_max_age(v) {
        this._jwt_max_age = v
    }
    set cookie_max_age(v) {
        this._cookie_max_age = v
    }


    signJWT(payload) {
        try {
            let token = jwt.sign(payload, this._secret, {
                expiresIn: this._jwt_max_age
            })
            return token
        } catch (err) {
            throw err
        }
    }

    verifyJWT(token){
        try {
            let payload = jwt.verify(token, this._secret);
            return payload
          } catch(err) {
            throw err
          }
    }

    setJWTInCookie(res, token) {
        res.cookie("jwt", token, {
            maxAge: this._cookie_max_age,
            httpOnly: true
        })
    }

    getJWTFromCookie(req){
        if(req.cookies['jwt']){
            return req.cookies['jwt']
        }else{
            return null
        }
    }
}


module.exports = new JWTService()