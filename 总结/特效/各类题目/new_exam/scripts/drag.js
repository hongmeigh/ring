var startDrag = function(source, target, callback){

	startDrag.target=document.querySelectorAll("."+target);
	startDrag.source=document.querySelectorAll("."+source);

    startDrag.params = {
		left: 0,
		top: 0,
		currentX: 0,
		currentY: 0,
		flag: false
	};

	function pointIn(x,y,cw,ch,tx,ty,tw,th){
		return (x>tx&&x<tx+tw&&y>ty&&y<ty+th)
			 ||(x>tx&&x<tx+tw&&y+ch>ty&&y+ch<ty+th)
			 ||(x+cw>tx&&x+cw<tx+tw&&y+ch>ty&&y+ch<ty+th)
			 ||(x+cw>tx&&x+cw<tx+tw&&y>ty&&y<ty+th)
	}

	var checkIn=(function(){
	    var tw=startDrag.target[0].offsetWidth,
	    th=startDrag.target[0].offsetHeight,
	    cw=startDrag.source[0].offsetWidth,
	    ch=startDrag.source[0].offsetHeight;

		return function(e){
			var nowX = e.clientX, nowY = e.clientY;
			var tx=0,ty=0,target,isin=false;
			var w=startDrag.source[0].offsetWidth;
			for(var i=0;i<startDrag.target.length;i++){
				tx=startDrag.target[i].getBoundingClientRect().left;
				ty=startDrag.target[i].getBoundingClientRect().top;
				if(pointIn(nowX,nowY,cw,ch,tx,ty,tw,th)){
					target=i;
					isin=true;
					break
				}
			}
			return {
				isin:isin,
				target:target
			}
		}
	})();



	function out(){
		for(var i=0;i<startDrag.target.length;i++){
			var originalcss=startDrag.target[i].getAttribute("class");
			var curcss=originalcss.replace("enter","");
			startDrag.target[i].setAttribute("class", curcss); 
		}
	}

	function parent(cur){
		var p=cur;
		while(p.getAttribute("class").indexOf("source")<0){
			p=cur.parentElement;
		}
		return p
	}

	for(var ii=0;ii<startDrag.source.length;ii++){
		startDrag.source[ii].onmousedown=function(event){
			startDrag.params.flag = true;
			if(!event){
				event = window.event;
				startDrag.source[ii].onselectstart = function(){
					return false;
				}  
			}
			var e = event;
			startDrag.params.currentX = e.clientX;
			startDrag.params.currentY = e.clientY;
			var sclone=parent(event.target).cloneNode(true);
			
		 	startDrag.clone=document.createElement("div");
		    startDrag.clone.style.position="fixed";
		    startDrag.clone.style.top=event.target.getBoundingClientRect().top;
			startDrag.clone.style.left=event.target.getBoundingClientRect().left;
		    startDrag.clone.setAttribute("class","move");
		    startDrag.clone.setAttribute("data",sclone.getAttribute("data"));
		    startDrag.clone.appendChild(sclone);
		    document.body.appendChild(startDrag.clone);
		};
	}

	document.onmouseup = function(event){
		var e = event ? event: window.event;
		
		var check=checkIn(e);

		if(check.isin&&startDrag.params.flag){
			var sclone=startDrag.clone.cloneNode(true);
			var t=startDrag.target[check.target];
			sclone.style="";
			sclone.setAttribute("class","");
			t.innerHTML="";
			t.innerHTML=startDrag.clone.childNodes[0].innerHTML;
			
			startDrag.target[check.target].setAttribute("class","drag js-scrotip");
			startDrag.curtarget=startDrag.target[check.target];
			if (typeof callback == "function") {
				callback();
			}
		}
		
		startDrag.clone?(document.body.removeChild(startDrag.clone),startDrag.clone=""):null;

		startDrag.params.flag = false;
		
	};
	
	document.onmousemove = function(event){
		var e = event ? event: window.event;
		if(startDrag.params.flag){
			var nowX = e.clientX, nowY = e.clientY;

			startDrag.clone.style.left = nowX-startDrag.source[0].offsetWidth/3 + "px";	
			startDrag.clone.style.top = nowY -startDrag.source[0].offsetHeight/3+ "px";

			var check=checkIn(e);

			out();

			if(check.isin){ 
				var originalcss=startDrag.target[check.target].getAttribute("class");
				startDrag.target[check.target].setAttribute("class", originalcss+" enter");  
			}
		}
	}		
};
