const fs=require("fs")
const path=require("path")

// const fullFileName=path.resolve(__dirname,"file","a.json")
// 
//C:\Users\edison\Desktop\博客项目\blog\promise-test\file\a.json
//console.log(fullFileName)

//异步读取文件，相比较于同步，性能更高且没有阻塞
// 
// fs.readFile(fullFileName,(err,data)=>{
//     if(err){
//         console.error(err)
//         return
//     }
//     console.log(data.toString())
// })

//回调函数获取一个文件内容

// function getFileContent(filename,callback){
//     const fullFileName=path.resolve(__dirname,"file",filename)
//     fs.readFile(fullFileName,(err,data)=>{
//         if(err){
//             console.error(err)
//             return
//         }
//         callback(
//             // data.toString()
//             JSON.parse(data.toString())
//         )
//     })
// }

//测试
//aData是一个对象
//这样的代码很麻烦，如果有很多文件，则需要回调N层。所以需要使用promise
//
// getFileContent("a.json",aData=>{
//     console.log("aData:",aData)
//     getFileContent(aData.next,bData=>{
//         console.log("bData",bData)
//         getFileContent(bData.next,cData=>{
//             console.log("cData",cData)
//             getFileContent(cData.next,dData=>{
//                 console.log("dData",dData)
//             })
//         })
//     })
// })

//使用promise获取文件内容
//因为使用promise就是为了杜绝callback—hell，所以这里不用callback
//
function getFileContent(fileName){
    return new Promise((resolve,reject)=>{
        const fullFileName=path.resolve(__dirname,"file",fileName)
        fs.readFile(fullFileName,(err,data)=>{
            if(err){
                reject(err)
                return
            }
            resolve(
                JSON.parse(data.toString())
            )
        })
    })
}
//
//这样最多就只有两层，相比于回调函数N层要好很多
getFileContent("a.json").then(aData=>{
    console.log("aData",aData)
    return getFileContent(aData.next)
}).then(bData=>{
    console.log("bData",bData)
})