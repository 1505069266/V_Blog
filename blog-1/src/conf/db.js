const env = process.env.NODE_ENV  //获取环境参数


//配置
let MYSQL_CONF
let REDIS_CONF

if(env === "development"){  //开发环境数据库
  MYSQL_CONF = {
    host: '47.95.216.215',
    user: 'root',
    password: '199608025Zhu',
    port: '3306',
    database: 'myblog'
  }
  REDIS_CONF={
    prot: 6379,
    host: '127.0.0.1'
  }
}

if(env === "production"){  //生成环境数据库
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '199608025zhu',
    port: '3306',
    database: 'myblog'
  }

  REDIS_CONF={
    prot: 6379,
    host: '127.0.0.1'
  }
}


module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}