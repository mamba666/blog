//登录需要传入一个用户名和密码
const loginCheck=(username,password)=>{
    if(username==="edison"&&password==="123"){
        return true
    }else{
        return false
    }
}
module.exports=loginCheck