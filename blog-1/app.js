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


    //解析cookie
    req.cookie={}
    const cookieStr=req.headers.cookie||""
    //item相当于cookieStr.split(";")的值
    cookieStr.split(";").forEach(item=>{
        if(!item){
            return
        }
        const arr=item.split("=")
        const key=arr[0]
        const val=arr[1]
        req.cookie[key]=val
    })
    

    //在处理路由前首先解析postdata
    getPostData(req).then(postData=>{
        req.body=postData

        //处理BLOG路由
        //
        //这里是在写完mysql.js后修改的
        //blogResult返回promise
        const blogResult=handleBlogRouter(req,res)
        if(blogResult){
            blogResult.then(blogData=>{
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }
        
        
        // const blogData=handleBlogRouter(req,res)
        // if(blogData){
        //     res.end(
        //         JSON.stringify(blogData)
        //     )
        //     return
        // }


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