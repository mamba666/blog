class BaseModel{
    //应该传入对象，字符串
    constructor(data,message){
        //如果没有传入对象，而是只传入了字符串，则将其赋值给message。
        if(typeof data==="string"){
            this.message=data
            data=null
            message=null
        }
        if(data){
            this.data=data
        }
        if(message){
            this.message=message
        }
    }
}
class SuccessModel extends BaseModel{
    constructor(data,message){
        super(data,message)
        this.errno=0
    }
}
class ErrorModel extends BaseModel{
    constructor(data,message){
        super(data,message)
        this.errno=-1
    }
}
module.exports={
    SuccessModel,
    ErrorModel
}