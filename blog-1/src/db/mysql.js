const mysql=require("mysql")
const MYSQL_CONFIG=require("../config/db")

//创建连接对象
const con=mysql.createConnection(MYSQL_CONFIG)

//开始连接
con.connect()

//新建一个执行sql语句的函数
//因为result没办法返回，所以需要一个回调函数
//又因为是异步的，所以可以用promise
function exec(sql){
    const promise=new Promise((resolve,reject)=>{
        con.query(sql,(err,result)=>{
            if(err){
                reject(err)
                return
            } 
            resolve(result)
        })
    })
    return promise
}

module.exports=exec