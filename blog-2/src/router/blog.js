//被app.js调用

const {SuccessModel,ErrorModel}=require("../model/resModel")
const {getList,getDetail,newBlog,updateBlog,delBlog}=require("../controller/blog")

//handleBlogRouter在判断完路由后会输出return后的东西
const handleBlogRouter=(req,res)=>{

    //定义参数
    const method=req.method
    const id=req.query.id
    
    //获取博客列表
    if(method==="GET"&&req.path==="/api/blog/list"){

        //要定义getList函数所需要的参数,下面同理
        const author=req.query.author
        const keyword=req.query.keyword

        //要返回controller里面的假数据,下面同理
        const listData=getList(author,keyword)
        return listData.then(result=>{
            return new SuccessModel(result)
        })
        

        //这里就需要使用model定义的东西了,下面同理
        // return new SuccessModel(listData)
    } 

    //获取博客内容
    if(method==="GET"&&req.path==="/api/blog/detail"){
        const detailData=getDetail(id)
        return detailData.then(result=>{
            return new SuccessModel(result)
        })
        
    }

    //上面两个都是GET请求，下面是POST请求，所以需要用到postData
    //这里对应app.js中的promise获取postdata
    
    //新建
    if(method==="POST"&&req.path==="/api/blog/new"){
        //因为新建的时候，肯定是登录之后，所以不会在postdate中写入author数据
        //先用假数据
        req.body.author="edison"
        const newData=newBlog(req.body)
        //实际上这里返回的result就是mysql.js中的result
        return newData.then(result=>{
            //实际上这里的参数就是上一个promise所返回的结果
            //如果上一个不返回，那么就是上上个
            console.log(result)
            return new SuccessModel(result)
        })
        // return new SuccessModel(newBlog(req.body))
    }

    //更新
    if(method==="POST"&&req.path==="/api/blog/update"){
        const updateData=updateBlog(id,req.body)
        return updateData.then(result=>{
            //这里是判断更新是否成功，之前怎么也找不到更新失败的状态
            //后来发现即使是传入空数据，数据库也会更新，只不过是更新为undefined
            //所以affectedRows永远为>0,即result永远是真
            if(result){
                return new SuccessModel(result)
            }else{
                return new ErrorModel("更新失败")
            }
        })
    }

    //删除
    if(method==="POST"&&req.path==="/api/blog/del"){
        let author="iverson"
        let delData=delBlog(id,author)
        return delData.then(result=>{
            if(result){
                return new SuccessModel()
            }else{
                return new ErrorModel("删除失败")
            }
        })
    }
}

module.exports=handleBlogRouter