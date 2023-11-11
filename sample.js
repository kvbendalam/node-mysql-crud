const express = require("express")

const app = express()

app.get("/", handleRoot)

function handleRoot(req, res){
    res.send("Root method")
}

app.listen(3000, ()=>{
    console.log("Express js server is running")
})