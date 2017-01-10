window.onload=function(){
	var canvas=document.getElementById("mycanvas");
	var ctx=canvas.getContext("2d");
	var randompoint=[],fixpoint=[],anglepoint=[];
	rect(ctx,250,250,100);
	getpoint(ctx,250,250,100,randompoint,fixpoint,anglepoint);
	canvas.onclick=function(){
		// var timer=setInterval(function(){
		// 	if(anglepoint.alpha<0.1){
		// 		clearInterval(timer);
		// 	}
		// 	drawangle(ctx,anglepoint);
			
		// },100)
	requestAnimationFrame(function(){
		drawangle(ctx,anglepoint)
	})
	}

}
function getpoint(ctx,x,y,w,randompoint,fixpoint,anglepoint){
	fixpoint=[[x+w,y],[x,y],[x,y+w],[x+w,y+w]];
	for(var i=0; i<4; i++){
		//var Q=i*Math.PI/2+Math.random()*Math.PI/2;
		var Q=Math.PI/4+i*Math.PI/2;
		var point=[];
		point[0]=x+w/2+w/4*Math.cos(Q);
		point[1]=x+w/2-w/4*Math.sin(Q);
		randompoint.push(point);
	}
	angle(ctx,fixpoint,randompoint,anglepoint);
}
function rect(ctx,x,y,w){
	ctx.beginPath();
	ctx.fillStyle="green";
	ctx.rect(x,y,w,w);
	ctx.fill();
}
function angle(ctx,fixpoint,randompoint,anglepoint){
	var arr=[],inext;
	for(var i=0; i<4; i++){
		// for(var j=0; j<4; j++){
		// 	//console.log(fixpoint);
		// 	var pf=[Math.sqrt((randompoint[j][0]-fixpoint[i][0])*(randompoint[j][0]-fixpoint[i][0])+(randompoint[j][1]-fixpoint[i][1])*(randompoint[j][1]-fixpoint[i][1]))];
		// 	pf.x=randompoint[j][0];
		// 	pf.y=randompoint[j][1];
		// 	arr.push(pf);
		// }
		// arr.sort(function(a,b){return a[0]-b[0];})
		// console.log(arr)
		if(i+1<4){
			inext=i+1;
		}else{
			inext=0
		}
		anglepoint.push([[fixpoint[i][0],fixpoint[i][1]],[fixpoint[inext][0],fixpoint[inext][1]],[randompoint[i][0],randompoint[i][1]]])
		anglepoint.push([[fixpoint[inext][0],fixpoint[inext][1]],[randompoint[i][0],randompoint[i][1]],[randompoint[inext][0],randompoint[inext][1]]])
	}
		anglepoint.push([[randompoint[0][0],randompoint[0][1]],[randompoint[1][0],randompoint[1][1]],[randompoint[2][0],randompoint[2][1]]])
		anglepoint.push([[randompoint[0][0],randompoint[0][1]],[randompoint[3][0],randompoint[3][1]],[randompoint[2][0],randompoint[2][1]]])
		anglepoint.r=2;
		anglepoint.alpha=1
		
		
	}
function drawangle(ctx,anglepoint){
	ctx.clearRect(0,0,600,600);
	anglepoint.r=anglepoint.r+3;
	anglepoint.alpha=anglepoint.alpha-0.02;
	for(var i=0; i<anglepoint.length; i++){
		var ang=2*Math.PI/10*i
		anglepoint[i].x=anglepoint.r*Math.cos(ang)
		anglepoint[i].y=-anglepoint.r*Math.sin(ang)
		ctx.save();
		ctx.translate(anglepoint[i].x,anglepoint[i].y);
		ctx.globalAlpha=anglepoint.alpha;
		ctx.beginPath();
		//console.log(anglepoint[i]);
		ctx.moveTo(anglepoint[i][0][0],anglepoint[i][0][1]);
		ctx.lineTo(anglepoint[i][1][0],anglepoint[i][1][1]);
		ctx.lineTo(anglepoint[i][2][0],anglepoint[i][2][1]);
		ctx.closePath();
		ctx.fillStyle="green";
		ctx.strokeStyle="blue";
		ctx.stroke();
		ctx.fill();
		ctx.restore();
	}
	if(anglepoint.alpha>0.1){
		requestAnimationFrame(function(){
			drawangle(ctx,anglepoint)
		})
	}

}