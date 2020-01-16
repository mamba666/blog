const handleBlogRouter=require("./src/router/blog")
const handleUserRouter=require("./src/router/user")
const querystring=require("querystring")

//先创建一个处理postdata的函数，以备promise使用
//这个getPostData(就相当于new Promise(async))
const getPostData=req=>{
    return new Promise((resolve,reject)=>{
        //如果请求方式不是post
        if(req.method!=="POST"){
            //这里不用reject({})是因为就算不是post也不算是错误
            // reject({})
            resolve({})
            return
        }
        //如果是post就会处理这个if
        if(req.headers["content-type"]!=="application/json"){
            resolve({})
            return
        }
        let postData=""
        req.on("data",chunk=>{
            postData+=chunk.toString()
        })
        req.on("end",()=>{
            if(!postData){
                resolve({})
                return
            }
            resolve(
                //JSON.parse() 方法用于将一个 JSON 字符串转换为对象。
                JSON.parse(postData)
            )
        })
    })
}

//主函数
const serverHandle=(req,res)=>{

    //公共参数都要放在app.js中
    //即可以通过req来检索的参数
    const url=req.url
    req.path=url.split("?")[0]
    req.query=querystring.parse(url.split("?")[1])

    //设置返回格式    
    res.setHeader("content-type","application/json")

    //处理postdate和路由
    getPostData(req).then(postData=>{

        //有了postdata就可以处理new等POST请求了
        //传给req是因为在router中会又req的参数，这样就能直接用
        req.body=postData
        //处理博客路由
        const blogResult=handleBlogRouter(req,res)
        if(blogResult){
            //blogData也是返回的promise
            blogResult.then(blogData=>{
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }

        //处理用户路由
        const userResult=handleUserRouter(req,res)
        if(userResult){
            userResult.then(result=>{
                res.end(
                    JSON.stringify(result)
                )
            })
            return
        }

        //404
        res.writeHead(404,{"content-type":"text/plain"})
        res.write("404")
        res.end()
    })

}

module.exports=serverHandle