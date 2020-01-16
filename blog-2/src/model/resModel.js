//被router文件引用

class BaseModel{
    //要传入的data是一个对象类型，msg是一个字符串类型
    constructor(data,msg){
        //如果第一个就传入的是字符串类型
        //那么就让msg等于这个字符串
        //如果第一个传入的是对象，那么就跳过这个判断，同时，data和msg也不会被清空
        if(typeof data==="string"){
            this.msg=data
            data=null
            msg=null
            console.log("xxxxx")
        }

        //这两个判断对应上面的赋空值
        if(data){
            this.data=data
        }
        if(msg){
            this.msg=msg
        }   
    }
}

//上面代码定义了一个BaseModel类
//下面通过extends关键字，继承了BaseModel类的所有属性和方法。
//
//子类必须在constructor方法中调用super方法，否则新建实例时会报错。
//这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，
//得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。
//如果不调用super方法，子类就得不到this对象。
class SuccessModel extends BaseModel{
    constructor(data,msg){
        super(data, msg) // 调用父类的constructor(data, msg)\
        this.errno=0 //这里是SuccessModel独有的属性
    }
}
class ErrorModel extends BaseModel{
    constructor(data,msg){
        super(data, msg) // 调用父类的constructor(data, msg)\
        this.errno=-1 //这里是ErrorModel独有的属性
    }
}

module.exports={
    SuccessModel,
    ErrorModel
}