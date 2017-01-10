var app=require("express")();
var http=require("http").Server(app);
var io=require("socket.io")(http);

app.get('/',function(req,res){
	res.send("welcome!")
})

http.listen(8888,function(){
	console.log("yes")
})