var img=new Image();
img.src="images/2.jpg";
img.onload=function(){
	window.onload=function(){
		var canvas=document.getElementById("mycanvas");
		var ctx=canvas.getContext("2d");
		var imgbg=ctx.createPattern(img,"no-repeat");
		var cirarr=[];
		//var x=canvas.width/2,y=canvas.height/2,r=150,Q=Math.random()*2*Math.PI,v=8;
		for(var i=0; i<3; i++){
			cirarr[i]={};
			cirarr[i].r=150;
			cirarr[i].Q=Math.random()*2*Math.PI;
			cirarr[i].v=5;
			cirarr[i].x=Math.random()*(canvas.width/3-cirarr[i].r*2)+150+(canvas.width/3)*i;
			cirarr[i].y=Math.random()*(canvas.height-cirarr[i].r*2)+cirarr[i].r;
		}
		function drawcircle(){
			ctx.clearRect(0,0,canvas.width,canvas.height);
					
			for(var d=0; d<cirarr.length; d++){
				ctx.save();	
				ctx.beginPath();
				ctx.strokeStyle="#fff";
				ctx.lineWidth=10;
				ctx.arc(cirarr[d].x,cirarr[d].y,cirarr[d].r,0,Math.PI*2);
				ctx.stroke();
				ctx.clip();
				ctx.fillStyle=imgbg;
				ctx.rect(0,0,canvas.width,canvas.height);
				ctx.fill();
				ctx.restore();
			}						
			getpoint();
			requestAnimationFrame(function(){
					drawcircle();
				})
		}
		function getpoint(){
			for(var j=0; j<cirarr.length; j++){
				if(cirarr[j].x+cirarr[j].r>=canvas.width||cirarr[j].x-cirarr[j].r<=0){
					cirarr[j].Q=Math.PI-cirarr[j].Q;
				}
				if(cirarr[j].y+cirarr[j].r>=canvas.height||cirarr[j].y-cirarr[j].r<=0){
					cirarr[j].Q=2*Math.PI-cirarr[j].Q;
				}
				cirarr[j].y=cirarr[j].y-cirarr[j].v*Math.sin(cirarr[j].Q);
				cirarr[j].x=cirarr[j].x+cirarr[j].v*Math.cos(cirarr[j].Q);
				for(z=j+1; z<cirarr.length; z++){
					if(Math.sqrt((cirarr[j].x-cirarr[z].x)*(cirarr[j].x-cirarr[z].x)+(cirarr[j].y-cirarr[z].y)*(cirarr[j].y-cirarr[z].y))<=cirarr[j].r+cirarr[z].r){
						var deg=Math.atan((cirarr[j].y-cirarr[z].y)/(cirarr[j].x-cirarr[z].x))+2*Math.PI;
						//console.log(deg)
						// cirarr[j].Q=2*deg-cirarr[j].Q;
						// cirarr[j].y=cirarr[j].y-cirarr[j].v*Math.sin(cirarr[j].Q);
						// cirarr[j].x=cirarr[j].x+cirarr[j].v*Math.cos(cirarr[j].Q);
						// cirarr[z].Q=2*deg-cirarr[z].Q;
						// cirarr[z].y=cirarr[z].y-cirarr[z].v*Math.sin(cirarr[z].Q);
						// cirarr[z].x=cirarr[z].x+cirarr[z].v*Math.cos(cirarr[z].Q);
						cirarr[j].Q=cirarr[j].Q-Math.PI;
						cirarr[j].y=cirarr[j].y-cirarr[j].v*Math.sin(cirarr[j].Q);
						cirarr[j].x=cirarr[j].x+cirarr[j].v*Math.cos(cirarr[j].Q);
						cirarr[z].Q=cirarr[z].Q-Math.PI;
						cirarr[z].y=cirarr[z].y-cirarr[z].v*Math.sin(cirarr[z].Q);
						cirarr[z].x=cirarr[z].x+cirarr[z].v*Math.cos(cirarr[z].Q);
					}
				}
			}	
		}
		requestAnimationFrame(function(){
			drawcircle();
		})
	}
}


