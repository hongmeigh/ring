$(document).ready(function(){
	$(".denglu .btn").click(function(){
		var value1=$(".denglu input[type=text]").val();
		var value2=$(".denglu input[type=password]").val();
		if(value1==1111&&value2==1111){
			$(".fixed").removeClass("disnone");
			$(".fixed").text("绑定成功");
		}
		else{
			$(".fixed").removeClass("disnone");
			$(".fixed").text("用户名密码无效");
		}
		setTimeout(function(){$(".fixed").addClass("disnone");},3000);
	})


	// var width = $(".container").width();
	//      	$('#main-slider-space').css({
	//       		width:width
	//       	});
	// 		$('.main-slide').css({
	// 			width:width
	// 		});
	// 		$(".slider-wrapper").css({
	// 			width:width*2
	// 		});
	// 	  	var i = 0;
	// 	  	$("contain").on("swipeleft",function(){
	// 		  	$(".slider-wrapper").append('<div class="main-slide"></div>');
	// 		  	//ajax 请求数据
	// 		  	i++;
	// 		  	$(".main-slide:last-child").html('<div style="border:1px solid #ccc; height:90%; ">'+i+'</div>');
	// 		  	//ajax 请求数据
	// 			var slides = $('.main-slide');
	// 			$('.main-slide').css({
	// 				width:width
	// 			});
	// 		    $('.slider-wrapper').animate(
	// 		      {'left' : -($(".main-slide:last-child").position().left)},
	// 		      1000,
	// 		      function(){
	// 		      	$(".main-slide:first-child").remove();
	// 		      	$('.slider-wrapper').css({
	// 		      		left:0		      		
	// 		      	})
	// 		      }
	// 		    );
	// 	  	});
	//     });
})