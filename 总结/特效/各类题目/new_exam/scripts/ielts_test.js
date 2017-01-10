
$(document).ready(function() {
	var review=false;
	if(review)
	{
		$('.review_content').hide();
		$('input').prop('readonly',true);
		$("input[type='radio']").prop('disabled',true);
		$("input[type='checkbox']").prop('disabled',true);
		$('label').css('cursor','default');	
		$('.ielts_work_content .question .question_option p.ops label').hover(function(){
			$(this).css({'color':'#494949','cursor':'default'});	
		});
		
		$('.hover_show').remove();
		$('#ielts_topbg .back img').remove();
		$('.arrow_btn').hide();
		//$('.drag_item').removeClass('source');
		$('p .icon_no').show();
	}
	else
	{
		/*startDrag("source", "drag",function(){
			var target_num = startDrag.clone.getAttribute("data");
			var intarget = startDrag.curtarget.getAttribute("data-pnum");
			$(startDrag.curtarget).parent('p').find('input').val(target_num);
			$(startDrag.curtarget).addClass('drag_answer');
			//console.log($(startDrag.curtarget).parent('p').find('input').val())
			$('.review_content input').prop("checked",false);
			$('#ielts_footer .pages_content li').each(function(i, e) {
				var q_num = $(e).data('point');
				if(intarget==q_num)
				{
					$(e).addClass('now_choice').addClass('have_answer');		
				}
				else
				{
					$(e).removeClass('now_choice');		
				}
				reviewClick($(e));
			});
		});		*/
	}
	
	/*head*/
	$('.back').on('mouseover',function(){
		$(this).find('img').fadeIn();	
	});
	$('.back').on('mouseout',function(){
		$(this).find('img').fadeOut();	
	});
	/**/
	$('.need_exp_content').on('mouseover',function(){
		$(this).find('.hover_show').show();	
	});
	$('.need_exp_content').on('mouseout',function(){
		$(this).find('.hover_show').hide();	
	});
	
	/**/
	$('.review_hover').on('mouseover',function(){
		$(this).find('.hover_show').show();	
	});
	$('.review_hover').on('mouseout',function(){
		$(this).find('.hover_show').hide();	
	});
	/**/
	$('.pages_content').on('mouseover',function(){
		$(this).find('.hover_show').show();	
	});
	$('.pages_content').on('mouseout',function(){
		$(this).find('.hover_show').hide();	
	});
	
	
	$('.need_exp').on('click',function(){
		var q=$(this).data("q");
		showPopup(q);
	});
	$('.bg_layer').on('click',function(){
		hidePopup();
	});
	
	/**/
	$('.title-content .no_tips').on('click',function(e){
		$(this).parents('.need_exp_content').unbind('mouseover');
		$(this).parents('.hover_show').fadeOut();
	});
	
	/**/
	$('.review_hover .no_tips').on('click',function(e){
		$(this).parents('.review_hover').unbind('mouseover');
		$(this).parents('.hover_show').fadeOut();
	});
	
	/**/
	$('.pages_content .no_tips').on('click',function(e){
		$(this).parents('.pages_content').unbind('mouseover');
		$(this).parents('.hover_show').fadeOut();
	});
	
	/**/
	$('.need_exp_popup li').on('click',function(){
		$('.need_exp_popup li').removeClass('select');
		$(this).addClass('select');
		$(this).parents('.title-content').find('.need_exp').addClass('active');
		hidePopup();
	});
	
	/*点击底部题号滚动到当前题*/
	$('#ielts_footer .pages_content li').on('click',function(){
		$('#ielts_footer .next_btn').css('visibility','visible');
		$('#ielts_footer .pre_btn').css('visibility','visible');
		syncQuestionNum($(this));
		var cur =$(this).data('point');
		$('#ielts_footer .pages_content li').each(function(i, e) {
            var arr =$(e).data('point');
			if(cur==arr)
			{
				$(e).addClass('now_choice');
				reviewClick($(e));
			}
			else
			{
				$(e).removeClass('now_choice');		
			}
        });
		$('.review_content input').prop("checked",false);	
		if($(this).hasClass('be_sign'))
		{
			$('.review_content input').prop("checked",true);	
		}
		reviewClick($(this));
	});
	
	/**/	
	$('#ielts_footer .pages_content li').each(function(i, e) {
		var q_num = $(e).data('point');
		var input_num;
				
		/*输入框验证*/
		$('.fillBlank').on('focus',function(){
			$('.drag').removeClass('current_drag');
			input_num = $(this).data('pnum');
			if(input_num==q_num)
			{
				if($(e).hasClass('be_sign'))
				{
					$('.review_content input').prop("checked",true);		
				}
				else
				{
					$('.review_content input').prop("checked",false);	
				}
				$(this).attr('placeholder','  ')
				$('#ielts_footer .pages_content li').removeClass('now_choice');
				$(e).addClass('now_choice');
				reviewClick($(e));
			}
		}).on('blur',function(){
			var v = $(this).val();
			if(v==''||v==null)
			{
				$(this).attr('placeholder',$(this).data('pnum'));
			}
		}).on('keyup',function(){
			input_num = $(this).data('pnum');
			if(input_num==q_num)
			{
				if($(e).hasClass('footer_error')||$(e).hasClass('footer_correct'))
				{
					$(e).removeClass('have_answer now_choice');
				}
				else
				{
					$(e).addClass('have_answer now_choice');
				}

				reviewClick($(e));
			}
			var v= $.trim($(this).val());
			if(v==null||v==''&&$(e).hasClass('now_choice'))
			{
				$(e).removeClass('have_answer');	
			}
		}).on('focus',function(){
			//$("html,body").animate({scrollTop:$(this).offset().top},500);
		});
		
		/*单选验证*/
		$('.rad label').on('click',function(){
			$('.drag').removeClass('current_drag');
			var radio_num = $(this).parents('.question_option').data('pnum');
			if(radio_num==q_num)
			{
				if($(e).hasClass('be_sign'))
				{
					$('.review_content input').prop("checked",true);		
				}
				else
				{
					$('.review_content input').prop("checked",false);	
				}
				$('#ielts_footer .pages_content li').removeClass('now_choice');
				if($(e).hasClass('footer_error')||$(e).hasClass('footer_correct'))
				{
					$(e).removeClass('have_answer now_choice');
				}
				else
				{
					$(e).addClass('have_answer now_choice');
				}
				reviewClick($(e));
			}
		});
		
		/*多选验证*/
		$('.sec label').on('click',function(){
			$('.drag').removeClass('current_drag');
			var check_num = $(this).parents('.question_option').data('pnum');	
			if(check_num==q_num)
			{
				
				if($(e).hasClass('footer_error')||$(e).hasClass('footer_correct'))
				{
					$(e).removeClass('have_answer now_choice');
				}
				else
				{
					$(e).addClass('have_answer now_choice');
				}
				if($(e).hasClass('be_sign'))
				{
					$('.review_content input').prop("checked",true);		
				}
				else
				{
					$('.review_content input').prop("checked",false);	
				}
				$(this).parents('.sec').find('input').each(function(ind, elem) {
					if($(elem).is(':checked'))
					{
						$(elem).removeClass('checked');
					}
					else
					{
						$(elem).addClass('checked');
					}
				});
				
				var checked_lenght = $(this).parents('.question_option').find('.checked').length;
				if(checked_lenght==0)				
				{
					$(e).removeClass('have_answer');
				}
				reviewClick($(e));
			}
			else
			{
				$(e).removeClass('now_choice');	
			}
		});
		
		/*拖拽验证*/
		$('.drag_content .drag').on('click',function(){
			var drag_num = $(this).data('pnum');
			if(drag_num==q_num)
			{
				if($(e).hasClass('be_sign'))
				{
					$('.review_content input').prop("checked",true);		
				}
				else
				{
					$('.review_content input').prop("checked",false);	
				}
				$('.drag').removeClass('current_drag');
				$(this).addClass('current_drag');
				$('#ielts_footer .pages_content li').removeClass('now_choice');
				$(e).addClass('now_choice');
				reviewClick($(e));
			}
		});
	});
	/*上一题按钮*/
	$('.pre_btn').on('click',function(){
		var now_choice=$('#ielts_footer .pages_content li.now_choice').length;
		$('#ielts_footer .next_btn').css('visibility','visible');
		$('#ielts_footer .pages_content li').each(function(i, e) {
			if($(e).hasClass('now_choice'))
			{
				$('#ielts_footer .pages_content li').removeClass('now_choice');
				$('#ielts_footer .pages_content li').eq(i-1).addClass('now_choice');
				syncQuestionNum($('#ielts_footer .pages_content li').eq(i-1));
				if($('#ielts_footer .pages_content li').eq(i-1).hasClass('be_sign'))
				{
					$('.review_content input').prop("checked",true);	
				}
				else
				{
					$('.review_content input').prop("checked",false);
				}
				reviewClick($('#ielts_footer .pages_content li').eq(i-1));
				if(i<=1)
				{
					$('#ielts_footer .pre_btn').css('visibility','hidden');
					return false;
				}
			}
				now_choice==0?$('#ielts_footer .pre_btn').css('visibility','hidden'):null;	
				
		});
	});
	
	var l =$('#ielts_footer .pages_content li').length;
	/*下一题按钮*/
	$('.next_btn').on('click',function(){
		$('#ielts_footer .pre_btn').css('visibility','visible');
		var m;
		var now_choice=$('#ielts_footer .pages_content li.now_choice').length;
		
		function add(i){
			m = i+1;
			if($('#ielts_footer .pages_content li').eq(m).hasClass('be_sign'))
			{
				$('.review_content input').prop("checked",true);	
			}
			else
			{
				$('.review_content input').prop("checked",false);
			}	
			
		}
		if(now_choice==0)
		{
			add(0);
			$('#ielts_footer .pages_content li').removeClass('now_choice');
			$('#ielts_footer .pages_content li').eq(m).addClass('now_choice');
			syncQuestionNum($('#ielts_footer .pages_content li').eq(m));
			reviewClick($('#ielts_footer .pages_content li').eq(m));
		}
		else
		{
			$('#ielts_footer .pages_content li').each(function(i, e) {
				if($(e).hasClass('now_choice'))
				{	
					add(i)
				}
			});	
			$('#ielts_footer .pages_content li').removeClass('now_choice');
			$('#ielts_footer .pages_content li').eq(m).addClass('now_choice');
			syncQuestionNum($('#ielts_footer .pages_content li').eq(m));
			reviewClick($('#ielts_footer .pages_content li').eq(m));
		}
		if(m>=l-1)
		{
			$('#ielts_footer .next_btn').css('visibility','hidden');
			return false;
		}
	});
	
	
	/*
	$('.review_content label').on('click',function(){

		if(!$(".ww li").hasClass("now_choice")){
			$(".ww li:first-child").addClass("now_choice first_choice be_sign");
			
		}
		else if($(".ww li").hasClass("first_choice")){
			$(".ww li:first-child").removeClass("now_choice");
			 if($('.review_content input').is(':checked')){
		       $(".ww li:first-child").removeClass("be_sign");
		     }
			$(".ww li").removeClass("first_choice")
		}
	});	*/
	
	
	/*drag选项position absolute*/
	var h = $('.drag_content').find('img').height()+100;
	var w = $('.drag_content').find('p').width()+50;
	$('.drag_area_right').css({'left':w,'top':h})
	
	var w = $('.ww').width();
	$('.pages_content .hover_show').css('left',w/2-50);
	
});

/*隐藏讲解浮层*/
function hidePopup(){
	$('.bg_layer').fadeOut();
	$('.need_exp_popup').fadeOut();
}

/*显示讲解浮层*/
function showPopup(q){
	var dom_h=$(document).height();
    $(".bg_layer").height(dom_h).fadeIn();
	$('.need_exp_popup').fadeOut();	
	$('.need_exp_popup'+q).fadeIn();	
}
/*同步题号和底部题号*/
function syncQuestionNum(obj){
	var footnum = obj.data("point");
	$('.js-scrotip').each(function(i, e) {
       var num = $(e).attr('data-pnum'); 
	   if(footnum==num)
	   {
		    $(e).focus().attr('placeholder',' ');
			$("html,body").animate({scrollTop:$(e).offset().top-160},500);
	   }
    });
	
}

/*是否点击review*/
function reviewClick(obj){
	$('.review_content label').on('click',function(){
		var $input = $('.review_content input');
		if($input.is(':checked'))
		{
			if(obj.hasClass('now_choice'))
			{
				obj.removeClass('be_sign');	
			}
		}
		else
		{
			if(obj.hasClass('now_choice'))
			{
				obj.addClass('be_sign');	
			}
		}	
	});	
}
