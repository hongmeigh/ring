buttonsClass = function(classButton) {
	alert("ok")
	//NEXT OVER
	$(classButton).append('<span class="hover"></span>').each(function () {  
	alert("yes")
		var $span = $('span.hover', this);
		
		var normal = $(this).attr("normal");
		var over = $(this).attr("over");
		
		$(this).css("background-image", "url("+normal+")");
		$span.css("background-image", "url("+over+")");
		
		fnFixPng($span);
		$span.css('opacity', 0);
		
	  	$(this).hover(function () { 
			if(!$(this).hasClass('disabled'))
			$span.stop().fadeTo(500, 1);   
	  	}, function () {  
			$span.stop().fadeTo(500, 0); 
		});  
	}); 
};
