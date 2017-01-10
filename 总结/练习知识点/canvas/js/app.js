$(function(){
	var canvas=document.getElementById("mycanvas");
	var c=canvas.getContext("2d");
	
	
	function time(){
		c.clearRect(0,0,1000,800);
		var x=200,y=300,r=10,len=60;
		var date=new Date();
		var hour=date.getHours(),mint=date.getMinutes(),senc=date.getSeconds();
		if(parseInt(hour/10)==0) hour="0"+hour;
		if(parseInt(mint/10)==0) mint="0"+mint;
		if(parseInt(senc/10)==0) senc="0"+senc;
		var datearr=[hour,mint,senc];
		var str=datearr.join("");
		for(var z=0; z<str.length; z++){
			num(x,y,numer[str[z]],c,r,len);
			x=x+(len+3*r);
			if(z==1||z==3){
				c.translate(30,20);
				vertical(x,y,c,r,len/3)
				c.fill();
				c.translate(-30,-20);
				c.translate(30,60);
				vertical(x,y,c,r,len/3);
				c.fill();
				c.translate(-30,-60);
				x=x+80;
			}
		}
	}
	setInterval(time,1000);
})
function horizontal(x,y,c,r,len){
	console.log(r)
	c.beginPath();
	c.moveTo(x+0.5*r,y);
	c.lineTo(x+len-0.5*r,y);
	c.arc(x+len-0.5*r,y+0.5*r,0.5*r,1.5*Math.PI,0.5*Math.PI);
	c.lineTo(x+0.5*r,y+r);
	c.arc(x+0.5*r,y+0.5*r,0.5*r,0.5*Math.PI,1.5*Math.PI);
	c.closePath();
	c.fillStyle="#ea09e2";
	c.shadowBlur=20;
	// c.shadowOffsetX=10;
	// c.shadowOffsetY=10;
	c.shadowColor="#fff";
}
function vertical(x,y,c,r,len){
	console.log(r)
	c.beginPath();
	c.moveTo(x-r,y+1.5*r);
	c.arc(x-r/2,y+1.5*r,0.5*r,1*Math.PI,2*Math.PI);
	c.lineTo(x,y+len-0.5*r);
	c.arc(x-0.5*r,y+len-0.5*r,0.5*r,0,1*Math.PI);
	c.lineTo(x-r,y+1.5*r);
	c.closePath();
	c.fillStyle="#ea09e2";
	c.shadowBlur=20;
	// c.shadowOffsetX=20;
	// c.shadowOffsetY=20;
	c.shadowColor="#fff";
}
function num(x,y,arr,c,r,len){
	for(var i=0; i<arr.length; i++){
		if(i==0||i==3||i==6){
			if(arr[i]){
				c.translate(0,len*i/3);
				horizontal(x,y,c,r,len);
				c.fill();
				c.translate(0,-len*i/3);
			}
		}
		else if(i==1||i==2||i==4||i==5){
			if(arr[i]){
				//console.log(i);
				if(i<3){
					c.translate(parseInt(i/2)*(len+r),0);
					vertical(x,y,c,r,len);
					c.fill();
					c.translate(-parseInt(i/2)*(len+r),0);
				}else{
					c.translate(i%2*(len+r),len);
					vertical(x,y,c,r,len);
					c.fill();
					c.translate(-i%2*(len+r),-len);
				}

			}
		}
	}

}