function route(handle,response,pathname,postData){
	console.log("进入路由");
	if(typeof handle[pathname]==='function'){
		handle[pathname](response,postData);
	}else{
		response.writeHead(404,{"Content-Type":"text/plain"});
		response.write("404 not found");
		response.end();
	}
}
exports.route=route;