const fs = require("fs")
const path = require("path")
const util = require("util")

let readF = util.promisify(fs.readFile)


function readFile(fileName){
  const fullFileName = path.resolve(__dirname, 'files', fileName)
  return readF(fullFileName)
}


async function  fc(fileName){
  const aData = JSON.parse((await readFile(fileName)).toString())
  console.log(aData);
  const bData = JSON.parse((await readFile(aData.next)).toString())
  console.log(bData);
  console.log(222);
}

fc('a.json')



