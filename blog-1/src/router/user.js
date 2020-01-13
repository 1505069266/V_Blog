const { login,register,registerExist } = require("./../controller/user")
const { SuccessModel, ErrorModel } = require('./../model/resModel')
const { set } = require("./../db/redis")

//获取cookie过期时间
const getCookieExpries = ()=>{
  const d = new Date()

  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return d.toGMTString()
}


const handleUserRouter = (req, res)=>{
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]

  //登陆
  if(method === "POST" && path === "/api/user/login"){
    const { username, password } = req.body
    console.log(username,password);
    const result = login(username, password)
    return result.then(data=>{
      if(data.username){ 
        //操作cokie
        // res.setHeader('Set-Cookie', `username=${data.username};path=/;httpOnly;expries=${getCookieExpries()}`)
        req.session.username = data.username
        req.session.realname = data.realname
        //同步到redis
        set(req.sessionId, req.session)

        return new SuccessModel(data)
      }
      return new ErrorModel("登录失败!")
    })
  }

  //注册
  if(method === "POST" && path === "/api/user/register"){
    const { username, password,realname } = req.body
    return registerExist(username).then(acountExist=>{
      if(acountExist.id){
        return Promise.resolve(new ErrorModel("账号已经存在!"))
      }
      const result = register(username, password,realname)
      return result.then(data=>{
        if(data.affectedRows){ 
          //操作cokie
          // res.setHeader('Set-Cookie', `username=${data.username};path=/;httpOnly;expries=${getCookieExpries()}`)
          req.session.username = username
          req.session.realname = realname
          //同步到redis
          set(req.sessionId, req.session)
  
          return new SuccessModel("注册成功!")
        }
        return new ErrorModel("注册失败!")
      })
    })
    
  }
 
  // //登录验证
  // if(method === "GET" && path === "/api/user/login-test"){
  //   console.log("test-req.session",req.session);
  //   console.log("test-req.cookie", req.cookie);
  //   if(req.session.username){
  //     return Promise.resolve(new SuccessModel())
  //   }
  //   return Promise.resolve(new ErrorModel("尚未登陆!"))
  // }
}

module.exports = handleUserRouter