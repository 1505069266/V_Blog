const http = require("http")
const querystring = require("querystring")


const server = http.createServer((req, res)=>{
  res.writeHead(200, {'content-type': 'text/plain'})
  const url = req.url
  console.log(url);
  req.query = querystring.parse(url.split('?')[1])
  res.end(JSON.stringify(req.query))
})
 

server.listen(3000, function(){
  console.log("server in http://localhost:3000");
})