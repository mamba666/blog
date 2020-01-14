const login=require("../controller/user")
const {SuccessModel,ErrorModel}=require("../model/resModel")

const handleUserRouter=(req,res)=>{
    const method=req.method
    
    //这里不饿能这样获取username和passwrod
    //因为req.query解析的是url，但是登录的时候是通过postdata传递数据的
    //所以使用req.body
    //const username=req.qureq.bodyery.username
    //const password=req.query.password

    if(method==="POST"&&req.path==="/api/user/login"){
        const {username,password}=req.body
        //对应上面
        const result=login(username,password)
        if(result){
            return new SuccessModel("登录成功")
        }else{
            return new ErrorModel("登录失败")
        }
    }

    //登录验证的测试
    if(method==="GET"&&req.path==="api/user/login-test"){
        if(req.cookie.username){
            return Promise.resolve(new SuccessModel())
        }
        return Promise.resolve(new ErrorModel("xxx"))
    }
}
module.exports=handleUserRouter
