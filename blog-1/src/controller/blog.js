const exec=require("../db/mysql")
const getList=(author,keyword)=>{
    //where 1=1是因为假如author和keyword都没有传值
    //那么where后面就直接是order，就会报错
    let sql=`select * from blogs where 1=1 `
    if(author){
        sql+=`and author="${author}" `
    }
    if(keyword){
        sql+=`and title like "${keyword}" `
    }
    sql+=`order by createtime desc;`
    
    //返回promise
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
    return {
        id:1,
        title:"A",
        content:"AA",
        author:"edison",
        createTime:"11"
    }
}
const newBlog=(blogData={})=>{
    //blogData是一个博客对象，包含title content属性
    console.log("blogData:",blogData)
    return {
        //表示新建博客，插入到数据表里面的id
        id:3
    }
}
const updateBlog=(id,blogData={})=>{
    //id是要更新博客的id
    //blogData是一个博客对象，包含title content属性
    console.log("update blog:",id,blogData)
    //更新成功就返回true
    return true
}
const delBlog=(id)=>{
    //id就是要删除博客的id

    //如果成功就返回true
    return false
}
module.exports={
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}