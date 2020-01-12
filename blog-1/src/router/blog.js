const {getList,getDetail,updateBlog,newBlog,delBlog}=require("../controller/blog")
const {SuccessModel,ErrorModel}=require("../model/resModel")
const handleBlogRouter=(req,res)=>{
    const method=req.method
    const id=req.query.id

    if(method==="GET"&&req.path==="/api/blog/list"){
        const author=req.query.author||""
        const keyword=req.query.keyword||""
        const listData=getList(author,keyword)
        return new SuccessModel(listData)
    }
    if(method==="GET"&&req.path==="/api/blog/detail"){
        //update和detail路由都需要获取id，所以可以提到全局
        //const id=req.query.id||""
        const detailData=getDetail(id)
        return new SuccessModel(detailData)
    }
    if(method==="POST"&&req.path==="/api/blog/new"){
        //app.js中设置了"req.body=postData"
        const data=newBlog(req.body)
        return new SuccessModel(data)
    }
    if(method==="POST"&&req.path==="/api/blog/update"){
        // const id=req.query.id||""
        const result=updateBlog(id,req.body)
        if(result){
            return new SuccessModel()
        }else{
            return new ErrorModel("更新失败")
        }
    }
    if(method==="POST"&&req.path==="/api/blog/del"){
        const result=delBlog(id)
        if(result){
            return new SuccessModel()
        }else{
            return new ErrorModel("删除失败")
        }
    }
}
module.exports=handleBlogRouter