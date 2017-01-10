$(function(){
	$(window).scroll(function(){
		var scrolltop=$(window).scrollTop();
		var top1=$("#my-canvas").offset().top;
		var top2=$("#canvas1").offset().top;
		var top3=$("#canvas2").offset().top;
		var top4=$("#canvas3").offset().top;
		if(scrolltop>top1&&scrolltop<top2){
			$(".fix div").removeClass("bgcolor");
			$(".fix div").eq(0).addClass("bgcolor");
			
		}
		if(scrolltop>top2&&scrolltop<top3){
			$(".fix div").removeClass("bgcolor");
			$(".fix div").eq(1).addClass("bgcolor");
		}
		if(scrolltop>top3&&scrolltop<top4){
			$(".fix div").removeClass("bgcolor");
			$(".fix div").eq(2).addClass("bgcolor");
		}
		if(scrolltop>top4){
			$(".fix div").removeClass("bgcolor");
			$(".fix div").eq(3).addClass("bgcolor");
		}
		})
	
	})