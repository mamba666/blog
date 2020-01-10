const getList=(author,keyword)=>{
    //先返回假数据
    return [
        {
            id:1,
            title:"A",
            content:"AA",
            author:"edison",
            createTime:"11"
        },
        {
            id:2,
            title:"B",
            content:"BB",
            author:"KOBE",
            createTime:"22"
        }
    ]
}
module.exports={
    getList
}