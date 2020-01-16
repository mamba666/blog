//专注于数据处理

const exec=require("../db/mysql")

const getList=(author,keyword)=>{
    //首先定义一个sql语句
    let sql=`select * from blogs where 1=1 `
    if(author){
        sql+=`and author='${author}' `
    }
    //因为keyword是关键字搜索，并且是对标题的查询，所以要用到模糊查询
    if(keyword){
        sql+=`and title like '%${keyword}%'`
    }
    return exec(sql)
} 
const getDetail=id=>{
    let sql=`select * from blogs where id='${id}';`
    //如果只返回return exec(sql)，那么是一个数组
    //让数组变为对象，因为id有且仅有一个
    return exec(sql).then(rows=>{
        return rows[0]
    })
}
//在参数这里使用了ES6的默认参数方法
const newBlog=(blogData={})=>{
    let {title,content,createtime,author}=blogData
    //一定要按照顺序来，不然会报错
    const sql=`insert into blogs(title,content,createtime,author) values('${title}','${content}','${createtime}','${author}');`
    return exec(sql).then(result=>{
        return  {
            id:result.insertId
        }
    })
}
const updateBlog=(id,blogData={})=>{
    //更新的时候只需要更新title，content
    let {title,content}= blogData
    let sql=`update blogs set title='${title}',content='${content}' where id='${id}';`
    return exec(sql).then(result=>{
        //起使这里所返回的知识一个信息，就跟resmodel的作用一样
        if(result.affectedRows>0){
            return true
        }
        return false
    })
    
}
const delBlog=(id,author)=>{
    let sql=`delete from blogs where id='${id}' and author='${author}';`
    return exec(sql).then(result=>{
        if(result.affectedRows>0){
            return true
        }
        return false
    })
}

module.exports={
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}