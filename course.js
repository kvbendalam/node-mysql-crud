const http = require('http')

const server = http.createServer(handleCourse)

const course = [{
    id:1,
    name:"Fullstack",
    name : "React"
},
{
    id:2,
    name:"Fullstack",
    name : "React"
},
{
    id:3,
    name:"Fullstack",
    name : "React"
}]

function handleCourse(req, res){
    res.writeHead(200)
    res.end(JSON.stringify(course))

}

server.listen(3000,()=>{
    console.log("Server is running!")
})