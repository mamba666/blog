const querystring=require("querystring")
const handleBlogRouter=require("./src/router/blog")
const handleUserRouter=require("./src/router/user")
const {SuccessModel,ErrorModel}=require("./src/model/resModel")

const serverHandle=(req,res)=>{
    //设置返回格式
    res.setHeader("content-type","application/json")

    //获取path
    //需要在路由中使用path，所以不能在这里定义path，因为其他文件访问不到
    const url=req.url
    req.path=url.split("?")[0]

    //解析query
    req.query=querystring.parse(url.split("?")[1])

    //处理BLOG路由
    const blogData=handleBlogRouter(req,res)
    if(blogData){
        res.end(
            JSON.stringify(blogData)
        )
        return
    }
    //处理USER路由
    const userData=handleUserRouter(req,res)
    if(userData){
        res.end(
            JSON.stringify(userData)
        )
        return
    }
    //
    res.writeHead(404,{"content-type":"text/plain"})
    res.write("404")
    res.end()
}
module.exports=serverHandle