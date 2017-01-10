var http=require("http");
var url = require("url");
var querystring = require('querystring');
var fs = require('fs');

console.log(__filename);
console.log(__dirname);

http.createServer(function(req,res){
	//console.log(typeof req.headers.referer);
	//req.headers.referer?console.log(url.parse(req.headers.referer,true,true)):console.log(req.headers.referer)
	//get请求数据在url中即query
	console.log(url.parse(req.url,url))
	//处理post请求数据在body中  start
	var post='';
	req.on('data',function(chunk){
		post=post+chunk;
	})
	req.on('end',function(){
		post=querystring.parse(post);
		console.log(post)
	})
	//end
	fs.readFile('./test.html',function(err,data){
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data.toString());
		res.end();
	})
	// res.writeHead(200, {'Content-Type': 'text/plain'});
	// res.end('hello world\n hello world\n hello world\n hello world\n hello world\n hello world')
}).listen(8888);