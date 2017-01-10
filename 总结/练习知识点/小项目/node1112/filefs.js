var fs=require("fs");

var count=0;
function filecount(filepath){	
	var files=fs.readdirSync(filepath)
	files.forEach(function(child,i){
		//console.log(child)
		if(child!='node_modules'&&child!='.svn'){
			var stats=fs.statSync(filepath+'/'+child)
			if(stats.isFile()){
				count++;
			}
			if(stats.isDirectory()){
				console.log("这是目录")
				filecount(filepath+'/'+child)
			}
		}
	})
	console.log(count)
	
}


filecount(process.argv[2])