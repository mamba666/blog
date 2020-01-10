//现在已经可以使用a.js中定义的方法了
const {add,mul}=require("./a")
//使用lodash
const _=require("lodash")

const sum=add(1,2)
const re=mul(2,3)
console.log(sum)
console.log(re)

const arr=_.concat([1,24],3)
console.log(arr)

console.log(add(1,2))
console.log(mul(2,3))