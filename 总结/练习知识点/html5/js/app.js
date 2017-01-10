var canvas=document.getElementById("mycanvas");
var c=canvas.getContext("2d");
c.strokeStyle="red";

//c.scale(1.5,1.5);
var lin=c.createLinearGradient(20,20,20,90);
lin.addColorStop(0,"red");
lin.addColorStop(0.2,"orange");
lin.addColorStop(0.4,"yellow");
lin.addColorStop(0.6,"green");
lin.addColorStop(0.8,"blue");
lin.addColorStop(1,"purple");
c.fillStyle=lin;
c.shadowOffsetX=5;
c.shadowOffsetY=5;
c.shadowBlur=3;
c.shadowColor="red";
c.moveTo(20,20);
c.lineTo(20,90);
c.lineTo(120,90);
c.closePath();
c.stroke();
c.fill();
c.fillStyle="green";
c.font="bold italic 20px '微软雅黑'"
c.fillText("canvas画图",20,150);
//c.clip(); 裁切路径 三角形之外的区域被裁切
c.globalAlpha=0.5;
c.fillStyle="green";
c.beginPath();
c.moveTo(300,100);
c.arc(300,100,50,0,30,true);
c.fill();
var a=0;
var h=setInterval(function(){
	a=a+1;
	x=(a/100)*Math.PI;
	c.clearRect(200,0,200,200);
	c.beginPath();
	c.moveTo(300,100);
	c.arc(300,100,50,0,0.3*Math.PI+x,false);
	c.closePath();
	c.fill();
	if(a==100){
		clearInterval(h);
		}
	},20)
var canvas1=document.getElementById("mycanvas1");
var c1=canvas1.getContext("2d");
c1.strokeStyle="green";
c1.beginPath();
c1.moveTo(0,200);
c1.bezierCurveTo(75,50,190,300,400,150);
c1.stroke();


c1.rotate(0.1*Math.PI);
c1.beginPath();
c1.moveTo(0,0);
c1.bezierCurveTo(75,50,190,300,400,150);
c1.stroke();