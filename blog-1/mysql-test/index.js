const mysql = require("mysql")

//创建连接对象
const con = mysql.createConnection({
  host: '47.95.216.215',
  user: 'root',
  password: '199608025Zhu',
  port: '3306',
  database: 'myblog'
})

//开始乱讲
con.connect()

//执行sql语句
//insert into users(username, password, realname) values('zhuxiaole','199608025zhu','朱晓乐');
// const sql = "insert into users(username, password, realname) values('zhuxiaole','199608025zhu','朱晓乐');"
const sql = `select * from users;`

con.query(sql,(err,result)=>{
  if(err){
    console.log(err);
    return
  }
  console.log(result);
})

//关闭连接
con.end()