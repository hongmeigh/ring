var fs=require("fs");

//写入数据 会替换掉原数据
// fs.writeFile('test.txt','hello world',function(err){
// 	console.log("写入成功");
// })

//写入数据 不会替换原数据
// for(var i=0;i<10;i++){
// 	//异步方法循环会先执行
// 	fs.appendFile('test.txt','\r\n'+'HELLO WORLD','utf8',function(err){
// 		console.log("加入成功");
// 	})
// 	console.log(i);
// }

//判断某文件是否存在
// fs.exists('./test.txt',function(exists){
// 	console.log(exists?'存在':'不存在');
// })
// fs.exists('../index/index.js',function(exists){
// 	console.log(exists?'存在':'不存在');
// })

//修改文件名称
// fs.rename('test.txt','test_xin.txt',function(err){
// 	console.log("修改成功");
// })

//用rename来达到移动文件的目的
// fs.rename('../test_xin.txt','test_xin.txt',function(err){
// 	console.log("移动成功");
// })

//读取文件
// fs.readFile('test_xin.txt','utf8',function(err,data){
// 	console.log(data);
// })

//删除文件
// fs.unlink('../test_xin.txt',function(err){
// 	console.log("删除成功");
// })

//创建目录
// fs.mkdir('css',function(err){
// 	console.log("创建成功");
// })

//删除目录
fs.rmdir('css',function(err){
	console.log("删除目录成功");
})