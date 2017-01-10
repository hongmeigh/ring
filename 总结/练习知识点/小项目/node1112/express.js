var express=require("express");
var fs=require('fs');
var app=express();

var bodyParser=require('body-parser');
var multer=require('multer');

app.use(bodyParser.urlencoded({extended:false}))
app.use(multer({dest:'/tmp/'}).array('image'))
app.use(express.static('images'));
app.use(express.static('css'));

app.get('/',function(req,res){
	console.log(req.subdomains)
	res.send('hello express')
})
app.get('/start',function(req,res){
	res.sendFile('/Users/hongmei.gao/Desktop/node1112/test.html');
})
app.get('/start/index',function(req,res){
	res.send('这是路由 /start/index')
})
app.get('/biaodan',function(req,res){
	console.log(req.query);
	res.send(JSON.stringify(req.query))
})
app.post('/upload',function(req,res){
	console.log(req.files[0]);
	var savefile=__dirname+'/images/'+req.files[0].originalname;
	console.log(savefile)
	fs.readFile(req.files[0].path,function(err,data){
		fs.writeFile(savefile,data,function(err){
			if(err){
				console.log(err)
			}else{
				res.send("文件上传成功")
			}
		})
	})
})

var server=app.listen(8888);