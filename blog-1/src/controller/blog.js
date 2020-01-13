const exec=require("../db/mysql")
const getList=(author,keyword)=>{
    //where 1=1是因为假如author和keyword都没有传值
    //那么where后面就直接是order，就会报错
    //定义一个sql语句
    let sql=`select * from blogs where 1=1 `
    if(author){
        sql+=`and author='${author}' `
    }
    //keyword只查询title
    if(keyword){
        sql+=`and title like '%${keyword}%' `
    }
    sql+=`order by createtime desc;`
    //exec返回的promise，所以getlist也是返回promise
    return exec(sql)

    //先返回假数据
    // return [
    //     {
    //         id:1,
    //         title:"A",
    //         content:"AA",
    //         author:"edison",
    //         createTime:"11"
    //     },
    //     {
    //         id:2,
    //         title:"B",
    //         content:"BB",
    //         author:"KOBE",
    //         createTime:"22"
    //     }
    // ]
}
const getDetail=(id)=>{
    const sql=`select * from blogs where id='${id}' `
    return exec(sql).then(rows=>{
        return rows[0]
    })
}
const newBlog=(blogData={})=>{
    const title=blogData.title
    const content=blogData.content
    const author=blogData.author
    const createtime=Date.now()

    const sql=`insert into blogs (title,content,createtime,author) values ('${title}','${content}','${createtime}','${author}');`
    
    return exec(sql).then(insertData=>{
        // console.log(insertData)
        return {
            id:insertData.insertId
        }
    })

    //blogData是一个博客对象，包含title content属性
    // // console.log("blogData:",blogData)
    // return {
    //     //表示新建博客，插入到数据表里面的id
    //     id:3
    // }
}
const updateBlog=(id,blogData={})=>{
    const title=blogData.title
    const content=blogData.content
    const sql=`update blogs set title='${title}',content='${content}' where id=${id}`
    return exec(sql).then(updateData=>{
        console.log(updateData)
        if(updateBlog.affectedRows>0){
            return true
        }else{
            return false 
        }
        
    })
    //id是要更新博客的id
    //blogData是一个博客对象，包含title content属性
    // console.log("update blog:",id,blogData)
    //更新成功就返回true
    // return true
}
const delBlog=(id,author)=>{
    const sql=`delete from blogs where id='${id}' and author='${author}';`
    return exec(sql).then(delData=>{
        if(delData.affectedRows>0){
            return true
        }
        return false 
    })

    //id就是要删除博客的id

    //如果成功就返回true
    // return false
}
module.exports={
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}