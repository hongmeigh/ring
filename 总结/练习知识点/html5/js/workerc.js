onmessage=function(e){
			var countadd=0;
			var count=parseInt(e.data);
			for(var i=0; i<count; i++){
				countadd=countadd+2;
				}
			postMessage(countadd);
			}