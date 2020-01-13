const { exec,escape } = require("./../db/mysql")

//登录逻辑
const login = (username, password)=>{
  username = escape(username)
  password = escape(password)
  const sql = `
    select username, realname from users where username=${username} and password=${password};
  `
  return exec(sql).then(rows=>{
    return rows[0] || {}
  })
}


//注册逻辑
const register = (username, password,realname)=>{
  username = escape(username)
  password = escape(password)
  realname = escape(realname)
  const sql = `
    insert into users(username, password,realname) values(${username},${password},${realname});
  `
  return exec(sql).then(rows=>{
    console.log(rows);
    return rows || {}
  })
}

//判断注册用户名是否存在
const registerExist = (username)=>{
  username = escape(username)
  const sql = `
    select * from users where username=${username};
  `
  return exec(sql).then(rows=>{
    
    return rows[0] || {}
  })
}

module.exports = {
  login,
  register,
  registerExist
}