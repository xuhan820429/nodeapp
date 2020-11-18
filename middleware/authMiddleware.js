const jwtService = require('./../services/jwtService')



//route guard
const canActive = (req, res, next) => {
    try {
        let jwt_token = jwtService.getJWTFromCookie(req)
        let payload = jwtService.verifyJWT(jwt_token)
        next()
    } catch (err) {
        res.redirect('/')
    }
}

//payload retrieve
const getPayloadFromJWT = (req, res, next) => {
    try {
        let jwt_token = jwtService.getJWTFromCookie(req)
        let payload = jwtService.verifyJWT(jwt_token)
        res.locals.user = payload
    } catch (err) {
        res.locals.user = null
    }
    next()
}


module.exports = { canActive, getPayloadFromJWT }