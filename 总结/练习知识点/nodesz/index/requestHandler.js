var exec = require("child_process").exec;
var querystring = require("querystring");
var fs=require("fs")
function start(response,postData){
	var body ='<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';

	response.writeHead(200,{"Content-Type":"text/html"});
	response.write(body);
	response.end();
}
function upload(response,postData){
	response.writeHead(200,{"Content-Type":"text/plain"});
	response.write("post of text:"+querystring.parse(postData).text);
	response.end();
}
function yemian(response,postData){
    fs.readFile("./ielts111/index.html",function(err,data){
        if(err){
            response.writeHead(404,{"Content-Type":"text/html"});
            response.write("页面出错");
        }
        else{
            response.writeHead(200,{"Content-Type":"text/html"});
            response.write(data.toString());
        }
    })
}
exports.start=start;
exports.upload=upload;
exports.yemian=yemian;