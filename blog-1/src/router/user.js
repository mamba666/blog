const handleUserRouter=(req,res)=>{
    const method=req.method

    if(method==="POST"&&req.path==="/api/blog/login"){
        return{
            msg:"login"
        }
    }
}
module.exports=handleUserRouter
