var img=new Image();
img.src="images/bingg.jpg"
window.onload=function(){
	var canvas=document.getElementById("mycanvas");
	var ctx=canvas.getContext("2d");
	var h=$("body").height(),w=$("body").width();
	canvas.height=h;
	canvas.width=w;
	var k=w/8;
	var point=[],hor=[],vet=[],wordpoint=[];
	ctx.translate(0,h);
	var timer,timer1,totalcount=0;
	var bgimg=ctx.createPattern(img,"repeat");
	function drawinit(){
		//console.log(vet)
		totalcount=totalcount+10;
		ctx.clearRect(0,0,w,-h);
		for(var i=0; i<index.length; i++){
			for(var j=0; j<index[i].length; j++){
				if(index[i][j]!='*'){
					if(-h+totalcount>0) totalcount=h;
					var x=j*k,y=-k*(i+1)-h+totalcount;
					ctx.fillStyle=bgimg;										
					rect(ctx,x,y,k,index[i][j],bgimg);
				}
			}
		}
		if(-h+totalcount<0){
			requestAnimationFrame(drawinit);
		}
	}
	requestAnimationFrame(drawinit);
	// var init=setInterval(function(){

	// },100)
	function draw(){
		//console.log(vet)
		ctx.clearRect(0,0,w,-h);
		for(var i=0; i<index.length; i++){
			for(var j=0; j<index[i].length; j++){
				if(index[i][j]!='*'){
					var x=j*k,y=-k*(i+1);
					for(var a=0; a<vet.length; a++){
						if(vet[a][1]==j&&vet[a][0]==i){
							if(vet[a].y<vet[a].btm){
								vet[a].y=vet[a].y+0.1*k;
								y=vet[a].y;
								vet.end=false;
							}else{	
								vet.end=true;							
								y=vet[a].y;								
							}
						}
					}
					for(var ax=0; ax<hor.length; ax++){
						if(hor[ax][1]==j&&hor[ax][0]==i){
							if(hor[ax].x>hor[ax].btm){
								hor[ax].x=hor[ax].x-0.1*k;
								x=hor[ax].x;
								hor.end=false;
							}else{	
								hor.end=true;							
								x=hor[ax].x;								
							}
						}
					}
					ctx.fillStyle=bgimg;
					rect(ctx,x,y,k,index[i][j],bgimg)
				}
			}
		}
	}
	function drawbg(){
		ctx.clearRect(0,0,w,-h);
		for(var i=0; i<index.length; i++){
			for(var j=0; j<index[i].length; j++){
				if(index[i][j]!='*'){
					var x=j*k,y=-k*(i+1);
					ctx.fillStyle=bgimg;
					for(var w=0; w<wordpoint.length; w++){
						if(wordpoint[w][1]==j&&wordpoint[w][0]==i){
							ctx.fillStyle="#000";
						}
					}
					rect(ctx,x,y,k,index[i][j],bgimg)
				}
			}
		}
	}
	function donghua(){	
			timer=setInterval(function(){
				draw();
				if(vet.end&&hor.end){
					//alert("1111")
					for(var b=0; b<vet.length; b++){
						index[vet[b][0]-vet[b].count][vet[b][1]]=index[vet[b][0]][vet[b][1]];
						index[vet[b][0]][vet[b][1]]="*";
						for(var d=0; d<hor.length; d++){
							if(vet[b][0]==hor[d][0]&&vet[b][1]==hor[d][1]){
								hor[d][0]=vet[b][0]-vet[b].count;
								hor[d][1]=vet[b][1];
							}
						}
					}
					for(var d=0; d<hor.length; d++){
							index[hor[d][0]][hor[d][1]-hor[d].count]=index[hor[d][0]][hor[d][1]];
							index[hor[d][0]][hor[d][1]]="*";
						}
					clearInterval(timer);
					vet.splice(0,vet.length);
					vet.end=false;
					hor.splice(0,hor.length);
					hor.end=false;
					draw();
				}
			},10);
	}
	//draw();
	canvas.onclick=function(event){
		var left=event.offsetX;
		var bottom=h-event.offsetY;
		point.push([Math.ceil(bottom/k)-1,Math.ceil(left/k)-1]);
		//console.log(index[Math.ceil(bottom/k)-1][Math.ceil(left/k)-1])
		if(point.length==3){
			point.shift();
		}
		//console.log(point.length);
		if(point.length==2){
			twopoint(point,draw,ctx,w,h,k,vet,donghua,hor,wordpoint,drawbg);
		}

	}
}
//画方块
function rect(ctx,x,y,k,txt,bgimg){
	ctx.beginPath();
	ctx.strokeStyle="#33f606";
	ctx.lineWidth=2;
	ctx.rect(x,y,k,k);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.font="25px '微软雅黑'";
	ctx.textAlign="center";
	ctx.textBaseline="middle";
	ctx.fillStyle="#fff";
	ctx.fillText(txt,x+k/2,y+k/2);	
}
//对传入的两点进行判断
function twopoint(point,draw,ctx,w,h,k,vet,donghua,hor,wordpoint,drawbg){
	if((index[point[0][0],point[0][1]]!="*"&&index[point[1][0],point[1][1]]!="*")&&(point[0][0]==point[1][0]||point[0][1]==point[1][1])&&!(point[0][0]==point[1][0]&&point[0][1]==point[1][1])){
		var str="";
		wordpoint.splice(0,wordpoint.length)
		if(point[0][0]==point[1][0]){
			if(point[1][1]-point[0][1]>0){
				for(var m1=point[0][1]; m1<point[1][1]+1; m1++){
					str=str+index[point[0][0]][m1];
					wordpoint.push([point[0][0],m1]);
				}
			}
			if(point[1][1]-point[0][1]<0){
				for(var m2=point[0][1]; m2>point[1][1]-1; m2--){
					str=str+index[point[0][0]][m2];
					wordpoint.push([point[0][0],m2]);
				}
			}
		}
		if(point[0][1]==point[1][1]){
			if(point[1][0]-point[0][0]>0){
				for(var m3=point[0][0]; m3<point[1][0]+1; m3++){
					str=str+index[m3][point[1][1]];
					wordpoint.push([m3,point[1][1]])
				}
			}
			if(point[1][0]-point[0][0]<0){
				for(var m4=point[0][0]; m4>point[1][0]-1; m4--){
					str=str+index[m4][point[1][1]];
					wordpoint.push([m4,point[1][1]])
				}
			}
		}
		console.log(str)
		for(var wo=0; wo<word.length; wo++){
			if(str==word[wo]){
				drawbg();
				setTimeout(function(){
					for(var p=0; p<wordpoint.length; p++){
					index[wordpoint[p][0]][wordpoint[p][1]]="*";
					}
					wordpoint.splice(0,wordpoint.length)
					drawshu(ctx,k,vet);
					drawheng(ctx,k,hor);
					if(vet.length>0&&hor.length>0){
						donghua();
						return;
					}
					if(vet.length>0){
						hor.end=true;
						donghua();
					}else{
						draw();
					}
					if(hor.length>0){
						vet.end=true;
						donghua();
					}else{
						draw();
					}
				},500)
								
			}
		}		
		
	}
}
//获取横向动画数组状态
function drawheng(ctx,k,hor){
		hor.splice(0,hor.length); hor.end=false;
		var sta=[],count=0,add=false,obj={},onesta=[]; 
		for(var j=0; j<index[0].length; j++){
			sta[j]=false;obj[j]=[];
			for(var i=0; i<index.length; i++){
				if(index[i][j]!="*"){
					sta[j]=true;
					obj[j].push([i,j])
				}				
			}
		}
		for(var z=0; z<sta.length; z++){
			if(sta[z]) add=true;
			if(add&&!sta[z]){
				count++;
			}
			if(count>0&&sta[z]){
				obj[z].forEach(function(elm,index){
					onesta=[elm[0],elm[1]];
					onesta.x=elm[1]*k;
					onesta.y=-k*(elm[0]+1);
					onesta.count=count;
					onesta.btm=elm[1]*k-count*k;
					hor.push(onesta);
				})
			}
			
		}
	}
	//获取纵向动画数组状态
	function drawshu(ctx,k,vet){
		vet.splice(0,vet.length);
		vet.end=false;
		for(var j=0; j<index[0].length; j++){
			var count=0,num=0;
			for(var i=0; i<index.length; i++){
				if(index[i][j]=='*'){
					count++;
				}
				if(count>0&&index[i][j]!='*'){
					num=count;
					var storearr=[i,j];
					storearr.count=num;
					storearr.x=j*k;
					storearr.y=-k*(i+1);
					storearr.btm=-k*(i+1)+num*k;
					vet.push(storearr);
				}
			}
		}
	}