const querystring=require("querystring")
const handleBlogRouter=require("./src/router/blog")
const handleUserRouter=require("./src/router/user")
// const {SuccessModel,ErrorModel}=require("./src/model/resModel")

//使用promise
//处理postdata，因为post是异步的
//这里没有用到reject是因为它是用来表示错误的，但是这里没有
const getPostData=(req)=>{
    const promise=new Promise((resolve,reject)=>{
        if(req.method!=="POST"){
            resolve({})
            return
        }
        if(req.headers["content-type"]!=="application/json"){
            resolve({})
            return
        }
        let postData=""
        req.on("data",chunk=>{
            postData+=chunk.toString()
        })
        req.on("end",()=>{
            //如果是空数据
            if(!postData){
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}


//主函数
const serverHandle=(req,res)=>{
    //设置返回格式
    res.setHeader("content-type","application/json")

    //获取path
    //需要在路由中使用path，所以不能在这里定义path，因为其他文件访问不到
    const url=req.url
    req.path=url.split("?")[0]

    //解析query
    req.query=querystring.parse(url.split("?")[1])

    //在处理路由前首先解析postdata
    getPostData(req).then(postData=>{
        req.body=postData

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
        //404
        res.writeHead(404,{"content-type":"text/plain"})
        res.write("404")
        res.end()
        })         

    //将以下代码移动到上面
    //
    // //处理BLOG路由
    // const blogData=handleBlogRouter(req,res)
    // if(blogData){
    //     res.end(
    //         JSON.stringify(blogData)
    //     )
    //     return
    // }
    // //处理USER路由
    // const userData=handleUserRouter(req,res)
    // if(userData){
    //     res.end(
    //         JSON.stringify(userData)
    //     )
    //     return
    // }
    // //404
    // res.writeHead(404,{"content-type":"text/plain"})
    // res.write("404")
    // res.end()
}

//输出
module.exports=serverHandle