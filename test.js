const http = require('http')


function handleCourse(req, res) {
  res.writeHead(200, { 'content-Type': 'text/html' });
  res.end('<h1>Hello world</h1>');
}
   
const server = http.createServer(handleCourse)

server.listen(3000,()=>{
    console.log("Server is running!")
})