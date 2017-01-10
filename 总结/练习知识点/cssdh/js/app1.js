$(function(){
	var ballcount=3;
	$(document).mousedown(function(e){
		window.pand=true;

	})
	$(document).mousemove(function(e){
		if(window.pand){
			console.log("yes")
			var x=e.pageX;
			var y=e.pageY;		
			count=count+1;
			clickbg(x,y,count,ballcount);
		}
	})
	$(document).mouseup(function(e){
		window.pand=false;
		var x=e.pageX;
		var y=e.pageY;		
		count=count+1;
		clickbg(x,y,count,ballcount);
	})
	//自动
	// var x=1900; y=1000;
	// setInterval(function(){
	// 	x=1900*Math.random();
	// 	y=1000*Math.random();
	// 	count=count+1;
	// 	clickbg(x,y,count,ballcount);
	// },200);
})
var color=["red","yellow","green","blue","orange","purple","pink","white","gray","darkgree","lightblue"];
var r=100;
var count=0;
function clickbg(x,y,count,ballcount){
	//var ballcount1=ballcount+Math.round(Math.random()*20);
	var htmlobj=[],deg=[],tasy=[],tasx=[]; 
   	var webkitStyles = '-webkit-transition' in document.documentElement.style;
   	var TRANSFORM_NAME = webkitStyles ? 'webkitTransform' : 'transform'; 
   	var rn=r*(Math.random()*2+0.2);	
	$("body").append("<div class='div"+count+"'></div>");
	for(var j=0; j<10; j++){
		var ballcount1=Math.round(Math.random()*20)+5;
		var rn=r*(j/5)+50;	
		for(var e=0; e<ballcount1; e++){
			var n=Math.round(Math.random()*10);
			$(".div"+count).append("<div class='"+color[n]+" circle dongh"+j+" ball"+e+"'></div>");
		}
		$(".div"+count+" "+".dongh"+j).css({"top":y,"left":x});	
		htmlobj[j]=[];deg[j]=[];tasy[j]=[];tasx[j]=[];	
		for(var i=0; i<ballcount1; i++){
			htmlobj[j][i]=$(".div"+count+" "+".dongh"+j+".ball"+i);
			deg[j][i]=2*Math.PI/ballcount1*i;
			tasy[j][i]=rn*Math.sin(deg[j][i]);
			tasx[j][i]=rn*Math.cos(deg[j][i]);
		}
	}
	setTimeout(
			function(){
				for(var m=0; m<10; m++){
					countnum=htmlobj[m].length;
					for(var n=0; n<countnum; n++){
						htmlobj[m][n][0].style[TRANSFORM_NAME]="translate("+tasx[m][n]+"px,"+tasy[m][n]+"px)";
						//console.log(n)
						var ran=0.5*Math.random();
						htmlobj[m][n][0].style["transition-delay"]=ran+"s";
						//htmlobj[m][n][0].style["transition-duration"]=0.5*Math.random()+0.1+"s";
					}
				}
		},100)
	//$(".div"+count+" "+".circle").css({"top":y,"left":x});	
	var divcount=$(".div"+count);
	setTimeout(function(){divcount.remove();},1200)	
}