const express = require('express')
const router = express.Router()

// get method
router.get('/login', (req, res) => {
    res.render("login")
})
router.get('/signup', (req, res) => {
    res.render("signup")
})
router.get('/logout', (req, res) => {
    res.redirect("/")
})

//post method
router.post("/login", (req, res) => {
    try {
        console.log(req.body)
    } catch (err) {
        throw err
    }
})

router.post("/signup", (req, res) => {
    try {
        console.log(req.body)
    } catch (err) {
        throw err
    }
})

module.exports = router