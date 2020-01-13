const handleBlogRouter = require("./src/router/blog")
const handleUserRouter = require("./src/router/user")
const { access } = require("./src/utils/log")
const { get, set } = require("./src/db/redis.js")
const querystring = require('querystring')

//获取cookie过期时间
const getCookieExpries = ()=>{
  const d = new Date()

  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return d.toGMTString()
}


// //session 数据
// const SESSION_DATA = {}

//用于处理 post data
const getPostData = (req)=>{
  return new Promise((resolve, reject)=>{
    if(req.method !== "POST"){
      resolve({})
      return
    }
    if(req.headers['content-type'] !== "application/json"){
      resolve({})
      return
    }
    let postData = ''
    req.on('data', chunk=>{
      postData += chunk.toString()
    })
    req.on('end', ()=>{
      if(!postData){
        resolve({
        })
        return
      }
      resolve(JSON.parse(postData))
    })
  })
}

const serverHandle = ((req, res)=>{
  //记录access log
  access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)

  //设置返回格式JSON
  res.setHeader("Content-Type", "application/json")

  const url = req.url
  //解析query
  req.query = querystring.parse(url.split('?')[1])

  //解析cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach(item=>{
    if(!item){
      return
    }
    item = item.trim()
    const arr = item.split("=")
    const key = arr[0]
    const val = arr[1]

    req.cookie[key] = val
  })


  // //解析 session
  // let needSetCookie = false
  // let userId = req.cookie.userid
  // if(userId){ 
  //   if(SESSION_DATA[userId]){
  //     console.log("1");
  //     req.session = SESSION_DATA[userId]
  //   }else{
  //     console.log("2");
  //     SESSION_DATA[userId] = {}
  //     req.session = SESSION_DATA[userId]
  //   }
  // } else {
  //   needSetCookie = true
  //   userId = Date.now() + Math.random()
  //   userId = `${Date.now()}_${Math.random()}`
  //   SESSION_DATA[userId] = {}
  // }
  // req.session = SESSION_DATA[userId]
  
  //解析session  使用redis
  let needSetCookie = false
  let userId = req.cookie.userId
  if(!userId){
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    //初始化session
    set(userId, {})
  }

  //获取session
  req.sessionId = userId
  get(req.sessionId).then(sessionData=>{
    if(sessionData == null){
      //初始化redis中的session值
      set(req.sessionId, {})
      //设置session
      req.session = {}
    }else{
      //设置session
      req.session = sessionData
    }

    //处理post  data
    return getPostData(req)
  }).then(postData=>{
    req.body= postData

    //处理blog路由
    const blogResult = handleBlogRouter(req, res)
    if(blogResult){
      blogResult.then(blogData=>{
        if(needSetCookie){
          res.setHeader('Set-Cookie', `userId=${userId};path=/;httpOnly;expries=${getCookieExpries()}`)
        }
        res.end(
          JSON.stringify(blogData)
        )
      })
      return
    }

    //处理user路由
    const userResult = handleUserRouter(req,res)
    if(userResult){
      userResult.then(userData=>{
        if(needSetCookie){
          res.setHeader('Set-Cookie', `userId=${userId};path=/;httpOnly;expries=${getCookieExpries()}`)
        }
        res.end(
          JSON.stringify(userData)
        )
      })
      return 
    }

    //未命中路由  返回404
    res.writeHead(404, {"Content-Type": "text/plain"})
    res.write("404 NOT FOUND")
    res.end()
  })
  
})

module.exports = serverHandle