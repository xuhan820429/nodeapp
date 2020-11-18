const express = require('express')

const daoService = require('./../services/daoService')
const errorService = require('./../services/errorService')
const jwtService = require('./../services/jwtService')
const router = express.Router()

// get method
router.get('/login', (req, res) => {
    res.render("login")
})
router.get('/signup', (req, res) => {
    res.render("signup")
})
router.get('/logout', (req, res) => {
    jwtService.clearJWTInCookie(res)
    res.redirect("/")
})

//post method
router.post("/login", async (req, res) => {
    try {
        let user = await daoService.getUser(req.body)
        let token = jwtService.signJWT(user)
        jwtService.setJWTInCookie(res, token)
        res.status(200).json(user)
    } catch (err) {
        console.log(errorService.parseError(err))
        res.status(400).json(errorService.parseError(err))
    }
})

router.post("/signup", async (req, res) => {
    try {
        let user = await daoService.createUser(req.body)
        let token = jwtService.signJWT(user)
        jwtService.setJWTInCookie(res, token)
        res.status(201).json(user)
    } catch (err) {
        console.log(errorService.parseError(err))
        res.status(400).json(errorService.parseError(err))
    }
})

module.exports = router