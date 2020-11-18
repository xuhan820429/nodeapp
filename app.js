const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const authRouter = require('./routes/authRoute')
const { canActive, getPayloadFromJWT } = require('./middleware/authMiddleware')

const app = express()

app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static("public"))
app.set('view engine', 'ejs');

app.listen(3000, () => {
    console.log('server listen on port 3000')
})


app.get("*", getPayloadFromJWT)
app.get("/", (req, res) => {
    res.render("home")
})
app.get("/content", canActive, (req, res) => {
    res.render("content")
})

app.use("/user", authRouter)
