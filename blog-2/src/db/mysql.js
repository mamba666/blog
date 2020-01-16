//创建mysql连接，然后才能处理sql语句
//然后将处理sql函数暴露给controller/blog.js

const MYSQL_CONFIG=require("../config/db")
const mysql=require("mysql")

//创建连接对象
const con=mysql.createConnection(MYSQL_CONFIG)

//连接
con.connect()

//exec函数执行sql语句
exec=sql=>{
    const promise=new Promise((resolve,reject)=>{
        con.query(sql,(err,result)=>{
            //这是返回的promise的结果
            if(err){
                reject(err)
                return
            }
            //这是返回的promise的结果
            resolve(result)
            console.log("mysql",result)
        })
    })
    //这里返回的实际上是new Promise(async)
    return promise
}


module.exports=exec