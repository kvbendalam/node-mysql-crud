const express = require('express')

const app = express();


app.get("/", sayHi, sayHello)

function sayHello(req, res, next) {
    console.log(req.abc)
    res.send("Hello")
}

function sayHi(req, res, next) {
    console.log("Hi")
    req.abc = "From Hi Method"
    next()
}

app.listen(3000, () => {
    console.log("Server is running...")
})