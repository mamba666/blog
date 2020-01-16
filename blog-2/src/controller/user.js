const exec=require("../db/mysql")

const login=(username,password)=>{
    let sql=`select username,realname from users where username='${username}' and password='${password}';`
    console.log(sql)
    return exec(sql).then(result=>{
        //因为是select语句，所以会返回一个数组形式的查询结果
        //data:[{},{}]
        console.log(result)
        //如果验证失败，那么result会返回undefined，那么前面的result.username就会报错
        //所以要返回一个{}
        return result[0]||{}
    })
}

module.exports=login