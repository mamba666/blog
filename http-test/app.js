//综合示例
//
const http=require("http")
const querystring=require("querystring")
const server=http.createServer((req,res)=>{
    const method=req.method
    const url=req.url
    const path=url.split("?")[0]
    const query=querystring.parse(url.split("?")[1])
    //设置返回格式
    res.setHeader("content-type","application/json")
    //返回的数据格式
    const resData={
        method,
        url,
        path,
        query
    }
    //判断请求方法
    if(method==="GET"){
        res.end(
            JSON.stringify(resData)
        )
    }
    if(method==="POST"){
        let postData=""
        req.on("data",chunk=>{
            postData+=chunk.toString()
        })
        req.on("end",()=>{
            resData.postData=postData
            res.end(
                JSON.stringify(resData)
            )
        })
    }
})
server.listen(8000)
console.log("8000!!!")



//处理post请求
//
// const http=require("http")
// const server=http.createServer((req,res)=>{
//     if(req.method==="POST"){
//         console.log("content-type",req.headers["content-type"])
//         let postData=""
//         req.on("data",chunk=>{
//             postData+=chunk.toString()
//         })
//         req.on("end",()=>{
//             console.log("postData",postData)
//             res.end("END~!")
//         })
//     }
// })
// server.listen(8000)
// console.log("8000!!!!")


//处理get请求
//
// const http=require("http")
// const querystring=require("querystring")

// const server=http.createServer((req,res)=>{
//     console.log(req.method)
//     const url=req.url
//     req.query=querystring.parse(url.split("?")[1])
//     res.end(JSON.stringify(req.query))
// })

// server.listen(8000)
// console.log("8000!!!")