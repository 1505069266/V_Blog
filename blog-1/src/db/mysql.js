const mysql = require("mysql")

const { MYSQL_CONF } = require("../conf/db")

//创建连接对象
const con = mysql.createConnection(MYSQL_CONF)

//开始连接
con.connect()


//统一执行sql的函数
function exec(sql){
  return new Promise((resolve,reject)=>{
    con.query(sql, (err, result)=>{
      if(err){
        reject(err)
        return
      }
      resolve(result) 
      // con.release()  //释放链接  
      //MySQL不是长连接，每次使用完要释放要不然时间长了要超时，然后每一次query就可以了。
    })
  })
}

module.exports = {
  exec,
  escape: mysql.escape
}