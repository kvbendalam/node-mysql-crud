const http = require('http')

const server = http.createServer(handleRequest)

function handleRequest(req, res){
    res.writeHead(200)
    res.end("Hello")
}

server.listen(3000, ()=>{
    console.log("Server is running on 3000")
})