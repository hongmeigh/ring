
var img=new Image();
img.src="images/222.png"

window.onload=function(){
	var canvasbig=document.getElementById("mycanvas");
	var ctx=canvasbig.getContext("2d");
	var count=0;
	var colorarr=["red","orange","#56f310","#0cf527","purple","#0ef4dc","green","blue","#e567c6","yellow"]
	var centerx=100,centery=100,r=50,borw=30,deg=0.002,count0=0,count1=0,count2=0,count3=0,count4=0,count5=0;	
	var index,color1=[];
	for(var i=0; i<6; i++){
		index=Math.floor(Math.random()*(10-i))
		color1.push(colorarr[index]);
		colorarr.splice(index,1);
	}
	ring(ctx,centerx,centery,r+borw,borw,color1[1],0,2*Math.PI);
	// var timer=setInterval(function(){
	// 	if(count<=1000){
	// 		count++;
	// 		if(count>50&&deg*count5<=0.7){
	// 			count5++;
	// 		}
	// 		if(count>100&&deg*count4<=0.6){
	// 			count4++;
	// 		}
	// 		if(count>150&&deg*count3<=0.5){
	// 			count3++;
	// 		}
	// 		if(count>200&&deg*count2<=0.4){
	// 			count2++;
	// 		}
	// 		if(count>250&&deg*count1<=0.3){
	// 			count1++;
	// 		}
	// 		if(count>300&&deg*count0<=0.3){
	// 			count0++;
	// 		}
	// 	}else{
	// 		clearInterval(timer)
	// 	}
	// 	ring(ctx,centerx,centery,r,borw,color1[0],0,2*Math.PI*deg*count0);
	// 	ring(ctx,centerx,centery,r+borw,borw,color1[1],0,2*Math.PI*deg*count1);
	// 	ring(ctx,centerx,centery,r+2*borw,borw,color1[2],0,2*Math.PI*deg*count2);
	// 	ring(ctx,centerx,centery,r+3*borw,borw,color1[3],0,2*Math.PI*deg*count3);
	// 	ring(ctx,centerx,centery,r+4*borw,borw,color1[4],0,2*Math.PI*deg*count4);
	// 	ring(ctx,centerx,centery,r+5*borw,borw,color1[5],0,2*Math.PI*deg*count5);
	// },10)


	var canvast=document.getElementById("canvas");
	var c=canvast.getContext("2d");
	var lin=c.createRadialGradient(400,400,100,400,400,500);
	//canvas加入的是原始图片的大小
	var cas=c.createPattern(img,"repeat")
	lin.addColorStop(0,"red")
	lin.addColorStop(0.35,"yellow")
	lin.addColorStop(0.7,"green")
	lin.addColorStop(1,"blue")
	c.beginPath();
	c.rect(0,0,800,800);
	c.fillStyle=cas;
	c.fill();

}
function ring(ctx,centerx,centery,r,borw,color,startdeg,enddeg){
	ctx.beginPath();
	ctx.arc(centerx,centery,r,startdeg,enddeg);
	ctx.strokeStyle=color;
	ctx.lineWidth=borw;
	ctx.stroke();
}