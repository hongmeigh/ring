window.onload=function(){
	var canvas=document.getElementById("mycanvas");
	var ctx=canvas.getContext("2d");
	var arr=[];
	var color=["red","yellow","green","blue","purple","pink","orange","#4f0cd9","#21f121","gray"];
	var count=0;
	var score=0;
	var time=20;
	var h=$("body").height(),w=$("body").width();
	//指定canvas的宽高用标签中的属性  不要用css来制定
	canvas.height=h;
	canvas.width=w;
	init(arr,color,w,h);
	//console.log(h)
	function draw(){
		//console.log(arr.length)
		ctx.clearRect(0,0,w,h);
		count++;
		if(count%20==0){
			init(arr,color,w,h);
		}
		if(count%100==0){
			time=time-1;
			document.getElementById("time").innerHTML="倒计时"+time+"s"
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
		delet(arr,w,h);
		if(count==2000){
			clearInterval(timer);
			alert("游戏结束")
		}
	}
	var timer=setInterval(draw,10);
	canvas.ontouchstart=function(event){
		//console.log(event.offsetX+" "+event.offsetY);
		//alert(event.pageX)
		for(var z=0; z<arr.length; z++){
			var pf=(arr[z][0]-event.pageX)*(arr[z][0]-event.pageX)+(arr[z][1]-event.pageY)*(arr[z][1]-event.pageY);
			if(Math.sqrt(pf)<arr[z].r){
				arr[z].clickable=true;
				arr[z].countnum=0;
				score=score+arr[z].score;
				document.getElementById("score").innerHTML="分数："+score;
				//arr.splice(z,1)
			}
		}
	}
	//禁止移动浏览器上下滑动到最上最下面出现黑边的操作
	document.querySelector('body').addEventListener('touchstart', function (ev) {
    	ev.preventDefault();
	});
}

function init(arr,color,w,h){
	var arronly=[];
	arronly.r=5+Math.random()*20;
	arronly.xs=Math.random()*3+1.5;
	arronly.colorf=color[Math.floor(Math.random()*10)];
	arronly.score=5-parseInt(arronly.r/10);
	arronly[0]=Math.random()*w;
	if(arronly[0]>w-arronly.r) arronly[0]=w-arronly.r;
	if(arronly[0]<arronly.r) arronly[0]=arronly.r;
	arronly[1]=-2*arronly.r;
	arr.push(arronly);
}

function delet(arr,w,h){
	for(var j=0; j<arr.length; j++){
		if(arr[j][1]>h+2*arr[j].r){
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
	//console.log(x+" "+y);
	var fontcolor=ctx.createRadialGradient(x,y,0,x,y,1.5*r);
	fontcolor.addColorStop(0,"white");
	fontcolor.addColorStop(1,color);
	ctx.fillStyle=fontcolor;
	ctx.lineWidth=1;
	ctx.fill();
}
