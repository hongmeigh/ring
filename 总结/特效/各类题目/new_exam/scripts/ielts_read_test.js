
$(document).ready(function() {
	var appraise=false;
	var review=false;
	if(review)
	{
		$('.review_content').hide();
		if(appraise){
			// 显示中英文对照
		}
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
		$('.drag').on('click',function(){
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
		
		
		/*勾选验证*/
		$('.ielts_reading_right_scroll .check_icon').on('click',function(obj){
			
			var check_num =$(this).parent('tr.js-scrotip').data('pnum');
			if(check_num==q_num)
			{
				if($(e).hasClass('be_sign'))
				{
					$('.review_content input').prop("checked",true);		
				}
				else
				{
					$('.review_content input').prop("checked",false);	
				}
				$(this).parent('tr.js-scrotip').find('.check_icon').removeClass('check_current_icon');
				$(this).parent('tr.js-scrotip').find('.check_icon').find('img').remove();
				$(this).addClass('check_current_icon');
				$(this).append('<img src="images/right_icon.png">')
				$('#ielts_footer .pages_content li').removeClass('now_choice');
				$(e).addClass('now_choice have_answer');
				var check_answer = $(this).data('check');
				$(this).parent('tr.js-scrotip').find('.check_answer_input').val(check_answer);
				reviewClick($(e));
			}
		});
	});	
		
		
	/**/	
	$('.ielts_reading_right_content .question .q_tit').on('click',function(){
		
		if($(this).parents('.question_option').find('.ops').css('display')=='block')
		{
			$(this).parents('.question_option').find('.ops').slideUp();
			$(this).find('img').attr('src','images/arrow_down.png');
		}
		else
		{
			$(this).parents('.question_option').find('.ops').slideDown();
			$(this).find('img').attr('src','images/arrow_up.png');
		}
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
	
	var w = $('.ww').width();
	$('.pages_content .hover_show').css('left',w/2-50);
	
	
	
	$('.question_option .q_tit').each(function(i, e) {
        var h= $(e).height();
		$(e).find('img').css('margin-top',h/2+8);
    });
	
	$('.contrast_content').on('click',function(){
		var $input = $('.contrast_content input');
		if($input.is(':checked'))
		{
			$('.translation').show();	
		}
		else
		{
			$('.translation').hide();	
		}	
		
	});
	if (review) {
		$('.ielts_reading_right_scroll .check_icon').unbind('click');
	}
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
		    $(e).focus().attr('placeholder','');
			$(".ielts_reading_right_scroll").nanoScroller({ scrollTo:$(e)});
		    $("html,body").animate({scrollTop:$(e).offset().top},500);
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
