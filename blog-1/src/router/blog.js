const { SuccessModel, ErrorModel } = require('./../model/resModel')
const { getList, getDetail,newBlog, updateBlog,delBlog } = require("./../controller/blog")


//统一的登陆验证函数
const loginCheck = function(req){
  if(!req.session.username){//没有用户名的话
    return Promise.resolve(new ErrorModel("尚未登录!"))
  }
}



const handleBlogRouter = (req,res)=>{
  const method = req.method
  const id = req.query.id
  const url = req.url
  const path = url.split('?')[0]

  //获取博客列表
  if(method === "GET" && path === "/api/blog/list"){
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    // const listData = getList(author, keyword)
    
    // return new SuccessModel(listData)
    const result = getList(author, keyword)
    return result.then(listData=>{
      return new SuccessModel(listData)
    })
  }

  //获取博客详情
  if(method === "GET" && path === "/api/blog/detail"){
    const result = getDetail(id)

    return result.then(data=>{
      return new SuccessModel(data)
    })
  }

  //新建一篇博客
  if(method === "POST" && path === '/api/blog/new'){
    const loginCheckResult = loginCheck(req)
    if(loginCheckResult){
      //未登录
      return loginCheckResult
    }

    if(!req.body.title){
      return Promise.resolve(new ErrorModel("新建博客失败!"))
    }

    
    req.body.author = req.session.username
    const result = newBlog(req.body)
    return result.then(data=>{
      return new SuccessModel(data)
    })
  }

  //更新一篇博客
  if(method === "POST" && path === "/api/blog/update"){
    console.log(req.body);
    const loginCheckResult = loginCheck(req)
    if(loginCheckResult){
      //未登录
      return loginCheck
    }loginCheckResult

    const result = updateBlog(id, req.body)

    return result.then(val=>{
      if(val){
        return new SuccessModel("博客更新成功!")
      }else{
        return new ErrorModel("更新博客失败!")
      }
    })
  }

  //删除一篇博客
  if(method === "POST" && path === "/api/blog/del"){
    const loginCheckResult = loginCheck(req)
    if(loginCheckResult){
      //未登录
      return loginCheckResult
    }

    const author = req.session.username
    const result = delBlog(id, author)
    
    return result.then(val=>{
      if(val){
        return new SuccessModel("删除博客成功!")
      }
      return new ErrorModel("删除博客失败!")
    })
  }
  
}

module.exports = handleBlogRouter