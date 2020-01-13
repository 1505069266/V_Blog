## nodemon
 * 类似于和PM2的监测文件变化并实时刷新的工具
## cross-env
 * 用来配置在linux, mac, windows都兼容的工具
 * 通过`process.env.NODE_ENV`来获取配置的环境
## 开发接口
 * 初始化路由: 根据之前技术方案的设计, 做出路由
 * 返回假数据: 讲路由和数据处理分离, 以符合设计原则
## mysql使用
 * 增
 ```sql
 insert into users(username, `password`, realname) values("zxl","1996","朱晓乐");
 ```
 * 查
 ```sql
 //查询全部
 select * from users;
 //查询条件
 select * from users where username = "zxl" and password = "1996";
 select * from users where username = "zxl" or username = "zhangsan";
 //模糊查询
 select * from users where username like "%x%";
 //排序
 select * from users order by id;//升序
  select * from users order by id desc;//降序
 ```
 * 改
 ```sql
 //如果数据库报safe mode  使用语句
 SET SQL_SAFE_UPDATES = 0;
 //修改对应数据  后面是修改那个值  前面是修改的值
 update users set realname = "朱晓乐2" where username = "zxl";
 ```
 * 删
 ```sql
 //删除username为 "zhangsan"的数据
 delete from users where username="zhangsan";
 //一般删除不会这样删除  会update删除  软删除  可恢复
 update users set state = "0" where username = "zxl";
 //查询
  select * from users where state = "1";
 ```
 * 通用查询
 ```
 //查询当前mysql版本
 select version();
 ```
### nodejs中使用mysql
 * 安装npm包
 ```JavaScript
 cnpm install mysql -S
 ```
 * 连接
 ```JavaScript
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
  //insert into users(username, password, realname) values('zhuxiaole','199608025zhu','朱晓乐')
  const sql = "select * from users;"

  con.query(sql,(err,result)=>{
    if(err){
      console.log(err);
      return
    }
    console.log(result);
  })

  //关闭连接
  con.end()
 ```
## 登录
 * 登录校验 & 登录信息存储
 * cookie和session
 * session 写入 redis
 * 开发登录功能, 和前端联调(用到nginx做反向代理)
### cookie
 * 什么是cookie
   * 存储在浏览器的一段字符串(最大5kb)
   * 跨域不共享
   * 格式如k1=v1;k2=v2;k3=v3; 因此可以存储结构化数据
   * 每次发送http请求, 会讲请求域的cookie一起发送给server
   * server端可以修改cookie并返回给浏览器
   * 浏览器中也可以通过js修改cookie(但是有限制  加 httpOnly)
   * 如何设置客户端不能修改服务端设置的cookie
   ```JavaScript
   `username=zxl;httpOnly`
   ```
 * js操作cookie, 浏览器中查看cookie
 * server端操作cookie, 实现登录验证
## session
 * cookie使用会暴露信息, 所以使用session, 后端处理信息就可以
## redis安装
 * linux安装
 [安装链接](https://www.runoob.com/redis/redis-commands.html)
 * redis连接不上服务器的redis问题待解决
## 日志模块
 * fs的readFile 和writeFile  存在IO操作的性能瓶颈
 * IO包括"网络IO" 和"文件IO"
 * 相比于CPU计算和内存读写, IO的突出特点就是: 慢!
 * 所以使用stream流的形式进行 IO 操作
```JavaScript
//标准输入输出, pipe就是管道(符合水流管道的模型图)
//process.stdin 获取数据 直接通过管道传递给process.stdout
// process.stdin.pipe(process.stdout)
```
## 安全
 * sql注入:  利用sql 语句  ' --    来进行操作   可以用mysql.escape(item) 方法来过滤注入
 * XSS攻击: 跨站脚本攻击  主要前端
 ```javascript
 //安装
 cnpm i xss -S
 //使用
 const xss = require("xss")
 title = xxs(title)
 ```
 * 密码加密
   * 万一数据库被用户攻破, 最不应该泄露的就是用户信息
   * 攻击方式: 获取用户名和密码, 再去尝试登录其他系统
   * 预防措施: 将密码加密, 即便拿到密码也不知道明文

