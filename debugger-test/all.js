const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req,res)=>{
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]
  const query = querystring.parse(url.split("?")[1])

  res.setHeader("Content-Type", "application/json")

  //返回数据
  const resData = {
    method,
    url,
    path,
    query
  }

  //返回
  if(method === "GET"){
    res.end(JSON.stringify(resData))
  }
  if(method === "POST"){
    let postData = ''
    req.on('data', chunk=>{
      postData += chunk
    })
    req.on('end',()=>{
      console.log(`postData: ${postData}`);
      res.end(
        JSON.stringify(resData)
      )
    })
  }
})

server.listen(8000, ()=>{
  console.log("server running in http://localhost:8000");
})