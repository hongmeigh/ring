var hello=function(){
	console.log("hello")
};
var world=function(){
	console.log("world")
};
//这样可以直接将接口对象更改成一个函数接口 而exports=hello则更改不了 module.exports==exports为true
//module.exports=hello;

exports.hello=hello;
exports.world=world;