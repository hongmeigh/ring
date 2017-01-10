$(function(){
	if(window.initial==0)
	{
		$("#choice_keynote").prop('checked',true);
		$("#choice_keynote").attr('value','0');
		$('.icon').removeClass("active");  
	}
	else
	{
		$("#choice_keynote").prop('checked',false);
		$("#choice_keynote").attr('value','1');	
		$('.icon').addClass("active");  
	}
   $("#choice_keynote").on("click",function(){	 
	   if($(this).prop('checked')==false){
		   console.log($(this).prop('checked'))
			   $(this).parents("span").addClass("active"); 
		 } 
		 else{
			   $(this).parents("span").removeClass("active");  
		 }
	 })
})


// 通用提示框  
// content：显示的内容,可以是html
function alertPop(content){
	var $popWrap = $('<div class="pop-layer-wrap"></div>').addClass('alert-pop').appendTo('body')
	$('<div class="pop-layer-bg"></div>').appendTo($popWrap)
	var $content = $('<div class="pop-layer-content"></div>').appendTo($popWrap)
	$('<div></div>').addClass('text').appendTo($content)
	$('<div class="btns"><a class="pop-sure-btn">确定</a></div>').appendTo($content)
  $('<div class="pop-title-bar"></div>').appendTo($content)
	$('<div class="close_btn"><a>关闭</a></div>').appendTo($content)

	$content.find('a').attr('href','javascript:void(0)').click(function(){  $popWrap.fadeOut('fast') })
	$content.find('.text').html(content)
	$popWrap.fadeIn('fast')
}

// 通用确认框
// confirmFn：确认按钮回调函数。  cancelFn：取消按钮回调函数，可不传，默认为关闭弹框
function confirmPop(content, confirmFn, cancelFn){
	var $popWrap = $('<div class="pop-layer-wrap"></div>').addClass('confirm-pop').appendTo('body')
	$('<div class="pop-layer-bg"></div>').appendTo($popWrap)
	var $content = $('<div class="pop-layer-content"></div>').appendTo($popWrap)
	$('<div></div>').addClass('text').appendTo($content)
	$('<div class="btns"><a class="cancel-btn">取消</a><a class="confirm-btn">确定</a></div>').appendTo($content)
	$('<div class="pop-title-bar"></div>').appendTo($content)
  $('<div class="close_btn"><a>关闭</a></div>').appendTo($content)

  $popWrap.close = function(){ $popWrap.fadeOut('fast', function(){$popWrap.remove()}) }
	$content.find('a').attr('href','javascript:void(0)')
	$content.find('.close_btn>a').click($popWrap.close)
	$content.find('.text').html(content)
	$content.find('.cancel-btn').click(cancelFn || $popWrap.close)
	$content.find('.confirm-btn').click(confirmFn)
	$popWrap.fadeIn('fast')

  return $popWrap
}

// 页面停留时间
var pageStayTime = 0
setInterval(function(){
	++pageStayTime
}, 1000)
function getPageStayTime(){
	return pageStayTime
}