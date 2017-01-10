window.onload=function(){
	var canvas=document.getElementById("mycanvas");
	var ctx=canvas.getContext("2d");
	var arr=[];
	var color=["red","yellow","green","blue","purple","pink","orange","#4f0cd9","#21f121","gray"];
	init(arr,color);
	var count=0;
	var score=0;
	function draw(){
		ctx.clearRect(0,0,600,600);
		count++;
		if(count%50==0){
			init(arr,color);
		}
		for(var i=0; i<arr.length; i++){
			if(arr[i].clickable){
				arr[i].countnum=arr[i].countnum+0.5;
				arr[i].r=arr[i].r+arr[i].countnum;
				ball(arr[i][0],arr[i][1],arr[i].r,arr[i].colorf,ctx);
			}else{
				arr[i][1]=arr[i][1]+arr[i].xs;
				ball(arr[i][0],arr[i][1],arr[i].r,arr[i].colorf,ctx);
			}
		}
		delet(arr);
	}
	setInterval(draw,10);
	canvas.onclick=function(event){
		console.log(event.offsetX+" "+event.offsetY);
		for(var z=0; z<arr.length; z++){
			var pf=(arr[z][0]-event.offsetX)*(arr[z][0]-event.offsetX)+(arr[z][1]-event.offsetY)*(arr[z][1]-event.offsetY);
			if(Math.sqrt(pf)<arr[z].r){
				arr[z].clickable=true;
				arr[z].countnum=0;
				score=score+arr[z].score;
				document.getElementById("score").innerHTML=score;
				//arr.splice(z,1)
			}
		}
	}
}

function init(arr,color){
	var arronly=[];
	arronly.r=10+Math.random()*40;
	arronly.xs=Math.ceil(Math.random()*3);
	arronly.colorf=color[Math.floor(Math.random()*10)];
	arronly.score=5-parseInt(arronly.r/10);
	arronly[0]=Math.random()*600;
	if(arronly[0]>600-arronly.r) arronly[0]=600-arronly.r;
	if(arronly[0]<arronly.r) arronly[0]=arronly.r;
	arronly[1]=-2*arronly.r;
	arr.push(arronly);
}

function delet(arr){
	for(var j=0; j<arr.length; j++){
		if(arr[j][1]>600+2*arr[j].r){
			arr.splice(j,1);
		}
		if(arr[j].countnum==5){
			arr.splice(j,1);
		}
	}
}

function ball(x,y,r,color,ctx){
	ctx.beginPath();
	ctx.arc(x,y,r,0,2*Math.PI);
	var fontcolor=ctx.createRadialGradient(x,y,0,x,y,1.5*r);
	fontcolor.addColorStop(0,"white");
	fontcolor.addColorStop(1,color);
	ctx.fillStyle=fontcolor;
	ctx.lineWidth=1;
	ctx.fill();
}
