$(function(){
	$(".scroll-wrap").mouseenter(function(){
		var wrap=$(".scroll-wrap");
		var cont=$(".scroll-cont");
		var bar=$(".bar");
		$(".scroll-bar").fadeIn(200);
		creatscroll(wrap,cont,bar);
	})
	$(".scroll-wrap").mouseleave(function(){
		var bar=$(".bar");
		$(".scroll-bar").fadeOut(200);
	})

})
function creatscroll(wrap,cont,bar){
	var wrapheight=wrap.height();
	var contheight=cont.height();
	var per=wrapheight/contheight;
	var barheight=wrapheight*per;
	bar.height(barheight);
	wrap[0].onwheel=function(event){
		var ztop=contheight-wrapheight;
		var conttop=parseInt(cont.css("top"));
		if(event.wheelDeltaY<0&&conttop>-ztop){
			cont.css("top",conttop-20);
		}
		else if(event.wheelDeltaY>0&&conttop<0){
			cont.css("top",conttop+20);
		}
		var bartop=(wrapheight-barheight)*(Math.abs(parseInt(cont.css("top")))/ztop)
		if(bartop>(wrapheight-barheight)){
			bartop=wrapheight-barheight;
		}
		bar.css("top",bartop)
	}
	bar.mousedown(function(e){
		window.down=true;
		window.pagey1=e.pageY;
		wrap.addClass("select");
	})
	$(document).mouseup(function(){
		window.down=false;
		wrap.removeClass("select");
	})
	$(document).mousemove(function(e){
		var csstop=parseInt(bar.css("top"))
		if(window.down&&csstop>-1&&csstop<(wrapheight-barheight)){
			window.pagey2=e.pageY;
			var changetop=csstop+window.pagey2-window.pagey1;
			var contchangetop=-changetop/(wrapheight-barheight)*(contheight-wrapheight);
			console.log(contchangetop)
			if(changetop<0){
				changetop=0;
				contchangetop=0
			}
			else if(changetop>(wrapheight-barheight)){
				changetop=wrapheight-barheight;
				contchangetop=wrapheight-contheight;
			}
			bar.css("top",changetop);
			cont.css("top",contchangetop);
			window.pagey1=window.pagey2;
		}
	})
	// wrap[0].addEventListener('mousewheel',function(event){
	// 	var ztop=contheight-wrapheight;
	// 	var conttop=parseInt(cont.css("top"));
	// 	//console.log(event)
	// 	if(event.wheelDeltaY<0&&conttop>-ztop){
	// 		console.log(conttop-20)
	// 		cont.css("top",conttop-20);
	// 	}
	// 	else if(event.wheelDeltaY>0&&conttop<0){
	// 		cont.css("top",conttop+20);
	// 	}
	// 	//console.log((Math.abs(conttop)))
	// 	var bartop=(wrapheight-barheight)*(Math.abs(parseInt(cont.css("top")))/ztop)
	// 	if(bartop>(wrapheight-barheight)){
	// 		bartop=wrapheight-barheight;
	// 	}
	// 	bar.css("top",bartop)
	// 	//console.log(event)
	// })

}