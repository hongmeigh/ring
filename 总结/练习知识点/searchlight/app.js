var img=new Image();
img.src="images/3.jpg";
img.onload=function(){
	window.onload=function(){
		var canvas=document.getElementById("mycanvas");
		var ctx=canvas.getContext("2d");
		var imgbg=ctx.createPattern(img,"no-repeat");
		var x=canvas.width/2,y=canvas.height/2,r=150,Q=Math.random()*2*Math.PI,v=8;
		
		function drawcircle(){
			ctx.clearRect(0,0,canvas.width,canvas.height);
			ctx.save();
			ctx.beginPath();
			ctx.strokeStyle="#fff";
			ctx.lineWidth=10;
			ctx.arc(x,y,r,0,Math.PI*2);
			ctx.stroke();
			ctx.clip();
			ctx.fillStyle=imgbg;
			ctx.rect(0,0,canvas.width,canvas.height);
			ctx.fill();
			ctx.restore();
			getpoint(canvas,x,y,v,Q,r);
			requestAnimationFrame(function(){
					drawcircle(ctx,canvas,x,y,r,imgbg,v,Q);
				})
		}
		function getpoint(){
			if(x+r>=canvas.width||x-r<=0){
				Q=Math.PI-Q;
			}
			if(y+r>=canvas.height||y-r<=0){
				Q=2*Math.PI-Q;
			}
			y=y-v*Math.sin(Q);
			x=x+v*Math.cos(Q);	
		}
		requestAnimationFrame(function(){
			drawcircle(ctx,canvas,x,y,r,imgbg,v,Q);
		})
	}
}


