const getList=(author,keyword)=>{
    //先返回假数据
    return [
        {
            id:1,
            title:"A",
            content:"AA",
            author:"edison",
            createTime:"11"
        },
        {
            id:2,
            title:"B",
            content:"BB",
            author:"KOBE",
            createTime:"22"
        }
    ]
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