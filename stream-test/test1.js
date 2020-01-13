const fs = require("fs")
const path = require("path")

// process.stdin.pipe(process.stdout)

// const http = require("http")

// const server = http.createServer((req,res)=>{
//   console.log("req",req.method);
//   if(req.method === "POST"){
//     req.pipe(res)
//   }
// })

// server.listen(8000)


//两个文件名
// var fileName1 = path.resolve(__dirname, 'data1.txt')
// let fileName2 = path.resolve(__dirname, 'data2.txt')


// const readStream = fs.createReadStream(fileName1)

// const writeStream = fs.createWriteStream(fileName2)

// readStream.pipe(writeStream)

// readStream.on('data', chunk=>{
//   console.log(chunk.toString());
//   console.log("----");
// })

// readStream.on('end', ()=>{
//   console.log("copy done");
// })


const http = require('http')
const fileName1 = path.resolve(__dirname, 'data2.txt')

const server = http.createServer((req,res)=>{
  if(req.method === "POST"){
    const readStream = fs.createReadStream(fileName1)
    readStream.pipe(res)
  }
})

server.listen(8000)
