var index={
	"width":"600px",
	"height": "300px",
	"top": 0,
	"left": "300px",
	"z-index": 111
}
var index_left={
	"width":"400px",
	"height": "200px",
	"top": "50px",
	"left": 0,
	"z-index": 11,
	"opacity":1
}
var index_right={
	"width":"400px",
	"height": "200px",
	"top": "50px",
	"left": "800px",
	"z-index": 11,
	"opacity":1
}
var opa={
	"top":"150px",
	"opacity": 0,
	"height": 0,
	"left": "-100px"
}
var opa1={
	"top":"150px",
	"opacity": 0,
	"height": 0,
	"left": "1300px"
}
var pand=true;
$(function(){
	function donghua(){
		pand=false;
		$(".index").find("div").css("opacity",0.5);
		$(".index_right").find("div").css("opacity",0);
		$(".index").css("z-index",11).animate(index_left,500,function(){
			$(this).removeClass("index").addClass("index_left");
			pand=true;
		});
		$(".index_right").css("z-index",111).animate(index,500,function(){
			$(this).removeClass("index_right").addClass("index");
			$(".btn span").removeClass("index-btn");
			$(".btn span").eq($(".index").attr("id")-1).addClass("index-btn");
		});
		$(".index_left").css("z-index",11).animate(opa,500,function(){
			$(this).removeClass("index_left").addClass("opa").css("left","1300px");
			$(".wrap").append(this);
		});
		$(".index_right").next().css("z-index",11).animate(index_right,500,function(){
			$(this).removeClass("opa").addClass("index_right");
		});
	}
	function donghua1(){
		pand=false;
		$(".index").find("div").css("opacity",0.5);
		$(".index_left").find("div").css("opacity",0);
		$(".index").css("z-index",11).animate(index_right,500,function(){
			$(this).removeClass("index").addClass("index_right");
			pand=true;
		});
		$(".index_right").css("z-index",11).animate(opa1,500,function(){
			$(this).removeClass("index_right").addClass("opa");
		});
		$(".index_left").css("z-index",111).animate(index,500,function(){
			$(this).removeClass("index_left").addClass("index");
			$(".btn span").removeClass("index-btn");
			$(".btn span").eq($(".index").attr("id")-1).addClass("index-btn");			
		});
		$(".tupian").last().css({"z-index":11,"left":"-100px"}).animate(index_left,500,function(){
			$(this).removeClass("opa").addClass("index_left");
			$(".wrap").prepend(this);
		});
	}
	var t=setInterval(donghua,2000);
	$(".tupian").mouseover(function(){
		clearInterval(t);
	}).mouseout(function(){
		t=setInterval(donghua,2000);
	})
	$(".contain").on("click",".index_left",function(){
		if(pand){
		donghua();
		}
	})
	$(".contain").on("click",".index_right",function(){
		if(pand){
		donghua1();
		}
	})
})