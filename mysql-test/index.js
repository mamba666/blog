const mysql=require("mysql")

//创建连接对象
const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"lwjkkkbbb1997",
    port:"3306",
    database:"myblog"
})

//连接
con.connect()

//查询
const sql="select * from blogs;"
con.query(sql,(err,result)=>{
    if(err) throw err
    console.log(result)
})

//关闭连接
con.end()