const redis = require("redis")
const { REDIS_CONF } = require('./../conf/db')

//创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

redisClient.on('error', err=>{
  console.log("错误:",err);
})


function set(key, val){
  if(typeof val === "object"){
    val = JSON.stringify(val)
  }
  redisClient.set(key, val, redis.print)
}


function get(key){
  return new Promise((resolve, reject)=>{
    redisClient.get(key, (err, res)=>{
      if(err){
        reject(err)
        return
      }
      if(res == null){
        resolve(null)
        return
      }

      try{
        resolve(JSON.parse(res))
      }catch(ex){
        resolve(res)
      }
    })
  })
}

module.exports = {
  get,
  set
}