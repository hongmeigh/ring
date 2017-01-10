// $(function(){
// 	var canvasbig=document.getElementById
// })
window.onload=function(){
	var canvasbig=document.getElementById("mycanvas");
	var ctxb=canvasbig.getContext("2d");
	var canvassmall=document.getElementById("smallcanvas");
	var ctxs=canvassmall.getContext("2d");
	var w=20;
	var graph,index,graphnew,indexnew;
	var countx=0,county=0,rotatecount=0,x,y,h,z,valueold=-1,valuenew=-2,pand=0,change=false;
	var storestate=[],statesmall=[],storelength={};
	var bottomstate=[];
	storelength.length=30;
	for(var btm=0; btm<30; btm++){
		bottomstate.push(30);
		storelength[btm]=[];
	}
	//console.log(storelength.length);
	index=Math.floor(Math.random()*6);
	graph=fangge[index];
	graph.color=colorstyle[Math.floor(Math.random()*10)];
	function getgra(){
		indexnew=Math.floor(Math.random()*6);
		graphnew=fangge[indexnew];
		graphnew.color=colorstyle[Math.floor(Math.random()*10)];
		countx=0; county=0; rotatecount=0;
	}
	getgra();
	function draw(ctxb,ctxs){
		change=false;
		ctxb.clearRect(0,0,600,600);
		statesmall=[];
		statesmall.color=graph.color;

		for(var aa=0; aa<storelength.length; aa++){
			if(storelength[aa].length>0){
				for(var ee=0; ee<storelength[aa].length; ee++){
					ctxb.fillStyle=storelength[aa][ee].color;
					drawsmall(ctxb,w,storelength[aa][ee][1],storelength[aa][ee][0]);
					ctxb.fill();
				}
			}
		}
		huas();
		change=true;
		for(var i=0; i<30; i++){
			for(var j=0; j<30 ;j++){
				drawrect(ctxb,w,i,j);				
			}
		}
		for(var sta=0; sta<statesmall.length; sta++){
			//将到达底部的元素加入状态数组
			if(bottomstate[statesmall[sta][0]]-1==statesmall[sta][1]){				
				statesmall.forEach(function(elm){
					elm.color=statesmall.color;
					storelength[elm[1]].push(elm);
					//storestate.push(elm);
				})
				//保存底部最新状态
				for(var add=0; add<statesmall.length; add++){
					valueold=statesmall[add][1];
					for(var add1=0; add1<statesmall.length; add1++){
						if(statesmall[add][0]==statesmall[add1][0]&&add!=add1){
							valueold=Math.min(valueold,statesmall[add1][1])						
						}
					}
					bottomstate[statesmall[add][0]]=valueold;
				}
				storestate=[];
				//判断是否满一行
				for(var f=0; f<storelength.length; f++){
					if(storelength[f].length==30){
						storelength[f]=[];
						for(var q=f; q>0; q--){
							storelength[q]=storelength[q-1];
							if(q-1==0){
								storelength[q]=[];
							}
							if(storelength[q].length>0){
								storelength[q].forEach(function(elem){
									elem[1]=elem[1]+1;
								})
							}							
						}
						for(var p=0; p<bottomstate.length; p++){
							bottomstate[p]=bottomstate[p]+1
						}
					}
					storestate=storestate.concat(storelength[f])
				}
				if(bianjietop()){
					alert("游戏结束");
					clearInterval(timer);
				}
				graph=fangge[indexnew];
				graph.color=graphnew.color;
				getgra();
				draws(ctxs);
				break;
			}
		}	
		county++;	
	}
	function huas(){
		for(var i=0; i<graph.length; i++){
			for(var j=0; j<graph[i].length; j++){
				if(graph[i][j]){
						if(rotatecount==0){h=j; z=i;}
						if(rotatecount==1){h=-i-1; z=j;}
						if(rotatecount==2){h=-j-1; z=-i-1;}
						if(rotatecount==3){h=i; z=-j-1;}
						x=300+w*countx+20*h;
						y=-60+w*county+20*z;						
						statesmall.push([x/20,y/20]);
						drawsmall(ctxb,w,y/20,x/20);
						ctxb.fillStyle=graph.color;
						ctxb.fill();
					}
			}
		}
	}
	function draws(ctxs){
		ctxs.clearRect(0,0,100,100)
		for(var m=0; m<5; m++){
			for(var n=0; n<5; n++){
				drawrect(ctxs,w,m,n);
				if(m<4&&n<4){
					if(graphnew[m][n]){
						ctxs.save();
						ctxs.translate(20,20);
						drawsmall(ctxs,w,m,n);
						ctxs.fillStyle=graphnew.color;
						ctxs.fill();
						ctxs.restore();
					}
				}
			}
		}
	}
	draws(ctxs);
	var timer=setInterval(function(){
		draw(ctxb,ctxs);
	},200)
	//37左,39右,38上,40下
	document.onkeyup=function(event){
		if(event.keyCode==38&&change){
			//clearInterval(timer)
			rotatecount++;
			if(rotatecount==4){
				rotatecount=0;
			}
			//draw(ctxb,ctxs)
		}
		if(event.keyCode==37){
			console.log(zuo())
			if(zuobianjie()&&zuo()&&change){
				countx--;
			}
		}
		if(event.keyCode==39){
			if(youbianjie()&&you()&&change){
				countx++;
			}
		}
	}
	//左右边界
	function zuobianjie(){
		return statesmall.every(function(x){
			return x[0]>0;
		})
	}
	function youbianjie(){
		return statesmall.every(function(x){
			return x[0]<29;
		})
	}
	function zuo(){
		return statesmall.every(function(xx){
			return storestate.every(function(yy){
				if(xx[1]==yy[1]){
					return xx[0]-yy[0]>1
				}else{
					return true;
				}
			})
		})
	}
	function you(){
		return statesmall.every(function(xx){
			return storestate.every(function(yy){
				if(xx[1]==yy[1]){
					return yy[0]-xx[0]>1
				}else{
					return true;
				}
			})
		})
	}
	//上边界
	function bianjietop(){
		return statesmall.some(function(x){
			return x[1]<=0;
		})
	}
}
function drawrect(ctxb,w,i,j){
	ctxb.beginPath();
	ctxb.strokeStyle="#333";
	ctxb.rect(w*j,w*i,w,w);
	ctxb.stroke();
}
function drawsmall(ctxb,w,i,j){
	ctxb.beginPath();
	ctxb.rect(w*j,w*i,w,w);
}

