var server=require("./server");
var requestHandler=require("./requestHandler");
// var os=require("os");
// console.log(os.platform());
//console.log(process.cwd()+"\\css\\");
//process.chdir(process.cwd()+"\\css\\");
var handle={};
handle["/"]=requestHandler.start;
handle["/start"]=requestHandler.start;
handle["/upload"]=requestHandler.upload;
handle["/yemian"]=requestHandler.yemian;

server.startserver(handle);