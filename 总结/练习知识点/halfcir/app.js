$(function(){
	var cas1=document.getElementById("mycanvas1");
	var ctx1=cas1.getContext("2d");
	var count=0;
	function wrap(value,ctx,cas,count){
		if(parseFloat(count).toFixed(2)<=value){
			drawcir(value,ctx,cas,count)
		}else{
			clearInterval(timer)
		}
		$(".canvaswrap img").css("transform","rotate("+value*180+"deg)")
		$(".canvaswrap img").css("-webkit-transform","rotate("+value*180+"deg)")
	}
	function drawcir(value,ctx,cas,count){
		ctx.clearRect(0,0,cas.width,cas.height);
		ctx.beginPath();
		ctx.arc(cas.width/2,cas.height,95,Math.PI,Math.PI+2*Math.PI);
		ctx.strokeStyle="#dcdcdc";
		ctx.lineWidth=20;
		ctx.stroke();
		ctx.closePath();
		ctx.beginPath();
		ctx.arc(cas.width/2,cas.height,95,Math.PI,Math.PI+count*Math.PI);
		ctx.strokeStyle="#f8c820";
		ctx.lineWidth=20;
		ctx.stroke();
		ctx.closePath();
	}
	var timer=setInterval(function(){
		count=count+0.01;
		wrap(1,ctx1,cas1,count)
	},15)

})