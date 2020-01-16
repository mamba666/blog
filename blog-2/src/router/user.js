//被app.js调用

const{SuccessModel,ErrorModel}=require("../model/resModel")
const login=require("../controller/user")

const handleUserRouter=(req,res)=>{
    //定义参数
    const method=req.method

    //登录
    if(method==="POST"&&req.path==="/api/user/login"){
        // const username=req.body.username
        // const password=req.body.password
        //解构赋值，与上面 一样的效果
        let {username,password}=req.body
        console.log(username,password)
        let loginData=login(username,password)
        console.log(loginData)
        return loginData.then(result=>{
            if(result.username){
                console.log("111")
                return new SuccessModel("登录成功")
            }
            return new ErrorModel("登录失败")
        })
    }
}

module.exports=handleUserRouter