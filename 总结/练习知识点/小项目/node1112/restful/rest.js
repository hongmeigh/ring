var express=require("express");
var fs=require('fs');
var app=express();

var bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('images'));
app.use(express.static('css'));

app.get("/rest.html",function(req,res){
	res.sendFile(__dirname+'/rest.html')
})
app.get('/inquire.html',function(req,res){
	res.sendFile(__dirname+'/inquire.html')
})
app.post('/add',urlencodedParser,function(req,res){
	console.log(req.body)
	var user={};
	user[req.body.username]={
		"name":req.body.name,
		"jobnumber":req.body.jobnumber
	};
	fs.readFile(__dirname+'/user.json','utf8',function(err,data){
		data?data=JSON.parse(data):data={};
		data[req.body.username]=user[req.body.username];
		console.log(data)
		fs.writeFile(__dirname+'/user.json',JSON.stringify(data,null,4),function(err){
			if(err){
				console.log(err)
			}else{
				res.send("添加用户成功")
			}
		})
	})

})

app.get('/delete',function(req,res){
	fs.readFile(__dirname+'/user.json',function(err,data){
		data=JSON.parse(data);
		delete data[req.query.username];
		fs.writeFile(__dirname+'/user.json',JSON.stringify(data,null,4),function(err){
			if (err) {
				console.log(err)
			}else{
				res.send("删除用户成功")
			}
		})
	})
})

app.get('/inquire',function(req,res){
	fs.readFile(__dirname+'/user.json',function(err,data){
		data=JSON.parse(data);
		for(var child in data){
			if(data.hasOwnProperty(child)){
				if(data[child].jobnumber==req.query.jobnumber){
					res.end("有"+" "+data[child].name);
				}
			}
		}
		res.send("不存在")
		res.end();
	})
})

var server=app.listen(8888,function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
