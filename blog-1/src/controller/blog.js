const { exec } = require("./../db/mysql")

//xxx.html?k1=v1&k2=v2&k3=v3

const getList = (author, keyword)=>{
  let sql = `select * from blogs where 1=1 `
  if(author){
    sql += `and author='${author}' `
  }
  if(keyword){
    sql += `and title like '%${keyword}%' `
  }

  sql += `order by createtime desc;`

  //返回promise
  return exec(sql)
}

const getDetail = (id)=>{
  const sql = `select * from blogs where id='${id}'`
  return exec(sql).then(rows=>{
    return rows[0]
  })
}

const newBlog = (blogData = {})=>{
  const title = blogData.title
  const content = blogData.content
  const author = blogData.author
  const createtime = Date.now()

  const sql = `
    insert into blogs(title, content, createtime, author)
    values('${title}', '${content}', '${createtime}', '${author}')
  `
  return exec(sql).then(insertData=>{
    return {
      id: insertData.insertId
    }
  })
}

const updateBlog = (id, blogData={})=>{
  const title = blogData.title
  const content = blogData.content

  const sql = `
    update blogs set title='${title}', content='${content}' where id=${id}
  `

  return exec(sql).then(result=>{
    if(result.affectedRows > 0){
      return true
    }
    return false
  })
}

const delBlog = (id, author)=>{
  const sql = `
    delete from blogs where id='${id}' and author='${author}';
  `
  return exec(sql).then(delData=>{
    if(delData.affectedRows > 0){
      return true
    }
    return false
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}