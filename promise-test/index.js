const fs = require("fs")
const util = require("util")
const path = require("path")



// util.promisify(fs.readFile)

//callback  方式获取一个文件的内容

function getFileContent(fileName,callback){
  const fullFileName = path.resolve(__dirname, 'files', fileName)
  fs.readFile(fullFileName, (err, data)=>{
    if(err){
      console.log(err);
      return
    }
    callback(
      JSON.parse(data.toString())
    )
  })
}


//测试
getFileContent('a.json', aData=>{
  console.log(aData);
  getFileContent(aData.next, bData=>{
    console.log(bData);
    getFileContent(bData.next, cData=>{
      console.log(cData);
    })
  })
})

