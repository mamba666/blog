//配置:在nodejs连接mysql中是直接手写的数据库库配置，并且只有一个。
//但是在开发中会有多种数据库配置需要判断出来并且调用。
//所以这里定义了MYSQL_CONFIG,用来单独判断环境变量，并且被输出到mysql.js。

//环境参数，开发环境或者线上等等
const env=process.env.NODE_ENV

let MYSQL_CONFIG

if(env==="dev"){
    MYSQL_CONFIG={
        host:"localhost",
        user:"root",
        password:"lwjkkkbbb1997",
        port:"3306",
        database:"myblog"
    }
}
if(env==="production"){
    MYSQL_CONFIG={
        host:"localhost",
        user:"root",
        password:"lwjkkkbbb1997",
        port:"3306",
        database:"myblog"
    }
}

module.exports=MYSQL_CONFIG