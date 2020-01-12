//获取环境变量
const env=process.env.NODE_ENV

//定义一个将会被输出的变量
let MYSQL_CONFIG

//判断开发环境
//参考package.json中的scripts
//dev：本地
//prd：线上
//prd线上的时候应该使用PM2部署，但是这里同意使用nodemon模拟、
//并且所返回的MYSQL_CONFIG均为本地数据库配置

if(env==="dev"){
    MYSQL_CONFIG={
        host:"localhost",
        user:"root",
        password:"lwjkkkbbb1997",
        port:"3306",
        database:"myblog"
    }
}else if(env==="prd"){
    MYSQL_CONFIG={
        host:"localhost",
        user:"root",
        password:"lwjkkkbbb1997",
        port:"3306",
        database:"myblog"
    }
}

module.exports=MYSQL_CONFIG