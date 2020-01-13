const {getList,getDetail,updateBlog,newBlog,delBlog}=require("../controller/blog")
const {SuccessModel,ErrorModel}=require("../model/resModel")
const handleBlogRouter=(req,res)=>{
    const method=req.method
    const id=req.query.id

    //返回promise
    if(method==="GET"&&req.path==="/api/blog/list"){
        const author=req.query.author||""
        const keyword=req.query.keyword||""
        const result=getList(author,keyword)
        //listData是mysql.js中返回的result
        return result.then(listData=>{
            return new SuccessModel(listData)
        })
        //写完mysql.js后，getList返回的就是promise了
        //所以先注释这里之前写的
        //
        // const listData=getList(author,keyword)
        // return new SuccessModel(listData)
    }
    if(method==="GET"&&req.path==="/api/blog/detail"){
        //update和detail路由都需要获取id，所以可以提到全局
        //const id=req.query.id||""
        // const detailData=getDetail(id)
        // return new SuccessModel(detailData)
        const result=getDetail(id)
        return result.then(data=>{
            return new SuccessModel(data)
        })
    }
    if(method==="POST"&&req.path==="/api/blog/new"){
        //因为新建博客需要先登录
        //所以这里先使用假数据
        req.body.author="fuck"
        const result=newBlog(req.body)
        //data就是id返回的一个东西
        return result.then(data=>{
            return new SuccessModel(data)
        })
        //app.js中设置了"req.body=postData"
        // const data=newBlog(req.body)
        // return new SuccessModel(data)
    }
    if(method==="POST"&&req.path==="/api/blog/update"){
        const result=updateBlog(id,req.body)
        return result.then(val=>{
            if(val){
                return new SuccessModel(val)
            }else{
                return new ErroModel(val)
            }
        })

        // const id=req.query.id||""
        // const result=updateBlog(id,req.body)
        // if(result){
        //     return new SuccessModel()
        // }else{
        //     return new ErrorModel("更新失败")
        // }
    }
    if(method==="POST"&&req.path==="/api/blog/del"){
        const author="edison"
        const result=delBlog(id,author)
        return result.then(val=>{
            if(val){
                return new SuccessModel()
            }else{
                return new ErrorModel("删除失败")
            }
        })
        
    }
}
module.exports=handleBlogRouter