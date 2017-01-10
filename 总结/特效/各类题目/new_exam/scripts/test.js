function initQues1(answer){
	if(answer){
		$(".wrap-insert .insert-area").each(function(index, elm){
			var $elm = $(elm);
			if($elm.data('answer') === answer){
				$elm.click();
			}
			if(window.ifClick)
			{
				$elm.off('click');
			}
			
		});
	}
}
//插入题传参数
function findAnswer(quesIndex, answer){
	$('.hg-drag').each(function(index, elm){
		var $elm = $(elm);		
		var answerText = $elm.find('i').text();
		var val = answerText.substring(0,1);
		
		if( val === answer){
			var str = $elm.text();
			$('input.answer' + quesIndex).val(val);
			$('textarea.answer' + quesIndex).val($.trim(str));
			 // 隐藏答案
            var $drag = $elm;
            $drag.prop('hg-back', false).removeClass('drag-mouse-over').css({display: 'none',top: 0,left: 0});

            // 绑定click事件
            var $textarea = $('textarea.answer' + quesIndex);
			$textarea.parent().addClass('drag-mouse-down');
            $textarea.on('click.hg', function(){
            	$textarea.val('').parent().removeClass('drag-mouse-down');
                $textarea.prev().val('');
                $drag.show('slow');
                $textarea.unbind('click.hg');
            });		
		}
	});
}
//拖拽传参公共函数
function initQues63(answerArr){
	if(answerArr.length > 0){
		findAnswer(1, answerArr[0])
		findAnswer(2, answerArr[1])
		findAnswer(3, answerArr[2])	
	}
}
//六选三传参数
function initQues44(answerArr){
	if(answerArr.length > 0){
		findAnswer(1, answerArr[0])
		findAnswer(2, answerArr[1])
		findAnswer(3, answerArr[2])
		findAnswer(4, answerArr[3])		
	}
}
//四选四排序题传参数
function initQues65(answerArr){
	if(answerArr.length > 0){
		findAnswer(1, answerArr[0])
		findAnswer(2, answerArr[1])
		findAnswer(3, answerArr[2])	
		findAnswer(4, answerArr[3])	
		findAnswer(5, answerArr[4])		
	}
}
//6选5
$(document).ready(function () {
	var inserted=$(".inserted-sentence").text();	
	$(".wrap-insert .insert-area").on('click',function(){
		var answer = $(".wrap-insert .insert-area-select").attr('data-answer');
		$(".wrap-insert .insert-area-select").text('').addClass('insert-area').removeClass('insert-area-select');		
		$(this).text(inserted).removeClass('insert-area').addClass('insert-area-select');
	});	
	
	//插入题
   // 时间显示与隐藏
	$(".about_time .btn_time").click(function(){
		var htmlContent=$(".about_time .btn_time").val()
		if(htmlContent=="Hide Time"){
    		$(this).siblings(".time").css("visibility","hidden");
    		$(this).val("Show Time");
    	}else{
    		$(this).siblings(".time").css("visibility","visible");
    		$(this).val("Hide Time");
    	}
	});
	//reading 时间显示隐藏
	$(".pop-layer-title .pull-right").click(function(){
		$(".popover-layer").css("display","none");
		$("#loading-mask").css("display","none");
	});    
	//弹出层
	$(".replay-btn").click(function(){
		if($(this).hasClass("btn-orange")){
			if($(".replay-show").is(":hidden")){
			   $(".replay-show").show();
			}else{
			    $(".replay-show").hide();
			}
		}
	});
		//replay 
	$(".volumn-show-btn").click(function(){
        if($(".volume-show").is(":hidden")){
            $(".volume-show").show();
        }else{
            $(".volume-show").hide();
        }
        if($(".player-show").is(":hidden")){
        	$(".player-show").show();
        }else{
        	$(".player-show").hide();
        }
    });
    //speaking_comprehensive 选项卡切换
    $(".speaking_comprehensive .tabs_content").hide().eq(0).show();
    $(".speaking_comprehensive .tabs_header span").click(function(){
        var spanIndex=$(this).index();
        $(".speaking_comprehensive .tabs_header span").removeClass("current");
        $(this).addClass("current");
        $(".speaking_comprehensive .tabs_content").hide()
        $(".speaking_comprehensive .tabs_content").eq(spanIndex).show();
    })
	//analytical 选项卡切换
    $(".analytical_main .right_div .tabs_content").hide().eq(0).show();
    $(".analytical_main .right_div .tabs_header span").click(function(){
        var spanIndex=$(this).index();
        $(".analytical_main .right_div .tabs_header span").removeClass("current");
        $(this).addClass('current');
        $(".analytical_main .right_div .tabs_content").hide();
        $(".analytical_main .right_div .tabs_content").eq(spanIndex).show();
    })
	//听力表格题的勾选
    $(".listen-excel tr .checkBox span").click(function(){
         $(this).parent().siblings().find("span").removeClass("icon-1_1");
         $(this).addClass("icon-1_1");
    })
    //听力表格题的隔行背景颜色
    var trs=$("#table tbody").find("tr");
    for(var i=0;i<trs.length;i++){
        if(i%2==0){
            trs[i+1].style.backgroundColor="#f3f3f3";
        }
    }
    //弹窗层的显示与隐藏
    //文本
    $(".translation_popup").hide();
    $(".translation_btn").click(function(){
        $(".translation_popup").show();
        $(".analytical_popup").hide();
    })
    $(".translation_popup .close_btn").click(function(){
        $(".translation_popup").hide();
    })
    //解析
    $(".analytical_popup").hide();
    $(".analytical_btn").click(function(){
        $(".analytical_popup").show();
        $(".translation_popup").hide();
    })
    $(".analytical_popup .close_btn").click(function(){
        $(".analytical_popup").hide();
    })
    //退出
    $(".cover_black").hide();
    $(".quit_dialog").hide();
    $(".quit_btn").click(function(){
        $(".cover_black").show();
        $(".quit_dialog").show();
    })
    $(".quit_dialog .close_btn").click(function(){
        $(".cover_black").hide();
        $(".quit_dialog").hide();
    })
    //下一题
    $(".next_dialog").hide();
    $(".next_btn").click(function(){
        $(".next_dialog").show();
        $(".cover_black").show();
    })
    $(".next_dialog .close_btn").click(function(){
        $(".cover_black").hide();
        $(".next_dialog").hide();
    })
    $(".next_dialog .ok_btn").click(function(){
        $(".cover_black").hide();
        $(".next_dialog").hide();
    })
    //时间到
    $(".warning_dialog").hide();
    //$(".cover_black").show();
    $(".warning_dialog .close_btn").click(function(){
        $(".warning_dialog").hide();
        $(".cover_black").hide();
    })
    //listening
    $(".listening_multiselect_popup").hide();
    $(".listening_multiselect_popup_btn").click(function(){
        $(".listening_multiselect_popup").show();
    })
    $(".common_popup .close_btn").click(function(){
        $(".listening_multiselect_popup").hide();
    })
    $(".listening_quit_dialog").hide();
    $(".cover_black").hide();
    $(".listening_quit_dialog_btn").click(function(){
        $(".listening_quit_dialog").show();
        $(".cover_black").show();
    })
    $(".common_dialog .close_btn").click(function(){
        $(".listening_quit_dialog").hide();
        $(".cover_black").hide();
        $(".listening_next_dialog").hide();
    })
    $(".listening_next_dialog").hide();
    $(".listening_next_dialog_btn").click(function(){
        $(".listening_quit_dialog").show();
        $(".cover_black").show();
    })
    //viewText
    $(".commom_tabs_popup .tabs_content").hide().eq(0).show();
    $(".commom_tabs_popup .tabs_header span").click(function(){
        var spanIndex=$(this).index();
         $(".commom_tabs_popup .tabs_header span").removeClass("current");
         $(this).addClass("current");
         $(".commom_tabs_popup .tabs_content").hide();
         $(".commom_tabs_popup .tabs_content").eq(spanIndex).show();
    })
    $(".commom_tabs_popup").hide();
    $(".viewText_btn").click(function(){
        $(".commom_tabs_popup").show();
    })
    $("body").click(function(){
        $(".commom_tabs_popup").hide();
    })
    $(".viewText_btn").click(function(e){
        e.stopPropagation();
    })
    $(".commom_tabs_popup").click(function(e){
        e.stopPropagation();
    })
	//volumn显示隐藏
   
    $('html').click(function(e){
        if(!$(e.target).hasClass('volumn-show-btn')){
            $('.player-show').hide();
        }        
     });
	 
	
	 if(window.lastPage)
	 {
		$('#footer .next').addClass('no-click').prop('disabled',true).css('cursor','default');
		$('#footer .pre').removeClass('no-click').prop('disabled',false).css('cursor','pointer');
		$('#footer .confirm').show();
	 }
	     
	if(window.firstPage)
	 {
		$('#footer .pre').addClass('no-click').prop('disabled',true).css('cursor','default');
		$('#footer .next').removeClass('no-click').prop('disabled',false).css('cursor','pointer');
	 }
});
function thisMovie(movieName){
	return swfobject.getObjectById(movieName);
}


//全居控制音量
function changeVolume(value){
	TestConst.volume = value;
	if(thisMovie("recorderTOL_swf")){
		  thisMovie("recorderTOL_swf").changeVolume(value);
	}
  
    if(thisMovie("listenerContent_swf")){
    	thisMovie("listenerContent_swf").changeVolume(value);
    }
}

function onReplay(){
	if(thisMovie("listenerContent_swf")){
		thisMovie("listenerContent_swf").replay();
	}
}

//type=1暂停，2继续，3重新播
function controllPlay(type){
    if(thisMovie("listenerContent_swf")){
        thisMovie("listenerContent_swf").controllPlay(type);
        }
}

/*拖拽获取选中值*/
function getDragChoosedVal(){
	var val=[];	
	$('.drag-in-area .clearfix').each(function(i, e) {
        var elem = $(e);
		elem.find('input').each(function(idx, elm) {
			val.push($(elm).val());
        });
    });
	return val;
}

function initStars(data){              
    $(".pingfen_item").each(function(index){
        var appendObj = ""
        for(var i = 0; i < data.detail[index]; i++){
            appendObj = appendObj + '<span class="on"></span>';
        }
        for(var i = data.detail[index]; i < data.total; i++){
            appendObj = appendObj + '<span class="off"></span>';
        } 
        $(this).find("span").after(appendObj);  
    })
}
