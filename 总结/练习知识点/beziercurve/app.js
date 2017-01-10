window.onload=function(){
	var canvas=document.getElementById("mycanvas");
	var ctx=canvas.getContext("2d");
	var moveable=false,k=[];
	var startx=100,starty=100,cx1=100,cy1=200,cx2=300,cy2=200,endx=300,endy=100;
	var arr=[[100,100],[100,200],[300,200],[300,100]];
	curve(ctx,arr);
	canvas.onmousedown=function(e){
		moveable=true;
		for(var i=0; i<arr.length; i++){
			var r=Math.sqrt((e.offsetX-arr[i][0])*(e.offsetX-arr[i][0])+(e.offsetY-arr[i][1])*(e.offsetY-arr[i][1]))
			if(r<10){
				k.value=i;
				k.originx=arr[i][0];
				k.originy=arr[i][1];
				k[0]=e.offsetX;
				k[1]=e.offsetY;
			}
		}
	}
	canvas.onmousemove=function(e){
		if(moveable){
			arr[k.value][0]=k.originx+e.offsetX-k[0];
			arr[k.value][1]=k.originy+e.offsetY-k[1];
			curve(ctx,arr);
		}
	}
	document.onmouseup=function(){
		moveable=false;
	}
}

function curve(ctx,arr){
	ctx.clearRect(0,0,1000,900)
	ctx.beginPath();
	ctx.strokeStyle="#000";
	ctx.lineWidth=5;
	ctx.moveTo(arr[0][0],arr[0][1]);
	ctx.bezierCurveTo(arr[1][0],arr[1][1],arr[2][0],arr[2][1],arr[3][0],arr[3][1]);	
	ctx.stroke();

	ctx.strokeStyle="#0f05c8";
	ctx.lineWidth=3;
	ctx.beginPath();	
	ctx.moveTo(arr[1][0],arr[1][1]);
	ctx.lineTo(arr[0][0],arr[0][1]);
	ctx.moveTo(arr[2][0],arr[2][1]);
	ctx.lineTo(arr[3][0],arr[3][1]);
	ctx.stroke();

	ctx.strokeStyle="red";
	ctx.lineWidth=2;
	ctx.beginPath();
	ctx.arc(arr[0][0],arr[0][1],10,0,2*Math.PI);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(arr[3][0],arr[3][1],10,0,2*Math.PI);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(arr[1][0],arr[1][1],10,0,2*Math.PI);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(arr[2][0],arr[2][1],10,0,2*Math.PI);
	ctx.stroke();
}