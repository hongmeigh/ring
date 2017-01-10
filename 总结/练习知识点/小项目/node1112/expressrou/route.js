var express=require("express");
var app=express();
var birds=require('./birds')

app.use('/birds',birds)
//设置模板文件路径 若该项不设置 则默认为views文件夹
app.set('views','./views')
app.set('view engine', 'jade');
var data={
	title: 'Hey', 
	message: 'Hello there!',
	message1:'express is good!'
}

var func1=function(req,res,next){
	console.log("这是处理函数1")
	next();
}
var func2=function(req,res,next){
	console.log("这是处理函数2")
	next();
}
app.get('/route',[func1,func2],function(req,res,next){
	next();
	console.log("这是处理函数3")
	
},function(req,res,next){
	console.log("这是处理函数4")
	res.send("响应")
})
app.get('/view.html',function(req,res){
	//这里的views相当于文件路径为__dirname+"/views/views.jade"
	res.render('views',{ title: 'Hey', message: 'Hello there!'})
})

app.get('/index.html',function(req,res){
	//这里的views相当于文件路径为__dirname+"/views/index.jade"
	res.render('index',data)
})

var server=app.listen(8888);