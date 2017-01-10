var http=require("http");
var url=require("url");
var querystring=require("querystring");
var router=require("./router");
console.log("ok");
function startserver(handle){
	console.log("进入函数");
	function onRequest(request,response){
		var postData="";
		var pathname=url.parse(request.url).pathname;
		console.log("pathname:"+pathname);
		console.log("请求页面");
		request.setEncoding("utf8");
		request.addListener("data",function(postDataChunk){
			postData+=postDataChunk;
			console.log("发送的数据："+postDataChunk);
		})
		request.addListener("end",function(){
			router.route(handle,response,pathname,postData);
		})
	}
	http.createServer(onRequest).listen(8888);
}
exports.startserver=startserver;