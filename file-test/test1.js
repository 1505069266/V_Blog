const fs = require('fs')
const path = require('path')


const fileName = path.resolve(__dirname, 'data.txt')

//读取文件内容
// fs.readFile(fileName, (err, data)=>{ //只能处理小文件  data太大的话  占内存
//   if(err) throw err

//   console.log(data.toString());
// })

//写入文件
// const content = "这是写入的内容\n"

// const opt = {
//   flag: 'a' //追加
// }

// fs.writeFile(fileName, content, opt, (err)=>{
//   if(err) throw err

//   console.log("success");
// })

//判断文件是否存在
// fs.exists(fileName, (exist)=>{
//   console.log("exist", exist);
// })




