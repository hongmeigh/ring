//这里相当于设置buf的长度 设置多长则buf.write就最多显示多长
var buf= new Buffer("ni hao hao");
//var buf= new Buffer([10,20,10,30,10]);
//var buf= new Buffer(10);

//若长度超过了上面设置的长度 超出长度的会被省略掉
var len=buf.write("hello ni hao");
console.log(len);
console.log(buf.toString())