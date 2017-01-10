/**
 * Created by Administrator on 12/15/2014.
 */
var hg = {};
hg.valueFormat = function(str){
    var val = str.replace('<br/>', '/r/n');
    val = val.replace(/\s*<\/?\w>\s*/g, '');
    val = val.replace(/&nbsp;/g, ' ');
    return val;
};
$(function(){
	if(window.isEditAble)
	{
		$('.drag-in-area .clearfix').each(function(index, e) {
			$(e).find('textarea').prop('disabled',true)
		});	
		$('.hg-drag').css('cursor','default');
		return;
	}
    var $document = $(document);
    var $html = $('html');
    $document.on('mousedown', '.hg-drag', function(e){
        e.stopPropagation();
        e.preventDefault();
        var $drag = $(this);
        var downX = e.clientX;
        var downY = e.clientY;
		var textareas = $('textarea');
		$drag.addClass("drag-mouse-over");
		var ranges = [];
        var css = {
            'position': $drag.css('position'),
            'pointer-events': $drag.css('pointer-events') == 'auto' ? '' : $drag.css('pointer-events')
        };
		for(var i=0; i<textareas.length; i++){
			var $item = $(textareas[i]);
			var left = $item.offset().left;
			var top = $item.offset().top;
			ranges[ranges.length] = {
				item: $item,
				startX: left,
				startY: top,
				endX: left + $item.outerWidth(),
				endY: top + $item.outerHeight()
			};
		}
        var htmlCursor = $html.css('cursor');
        var dragMoveFunc = function(e){
            var moveX = e.clientX;
            var moveY = e.clientY;
            $drag.css({
                top: (moveY - downY) + 'px',
                left: (moveX - downX) + 'px'
            });
        };
        var dragUpFunc = function(){
            if($drag.prop('hg-back')){
                $drag.animate({
                    top: 0,
                    left: 0
                }, 'slow', function(){
                    $drag.css(css).removeClass('drag-mouse-over');
                })
            }
            unbindFunc();
        };
		var documentUpFunc = function(e){
			for(var i=0; i<ranges.length; i++){
				if(e.pageX >= ranges[i].startX && e.pageX <= ranges[i].endX && e.pageY >= ranges[i].startY && e.pageY <= ranges[i].endY){
					var value = hg.valueFormat($drag.html());
					var $textarea = ranges[i].item;
					if($textarea.val()) return;
					var ttt=$drag.children('i').text().substring(0,1);
					$textarea.prev().val(ttt);
					$drag.prop('hg-back', false);
					$textarea.val($.trim(value));
					$drag.css({
						display: 'none',
						top: '',
						left: ''
					});
					$drag.css(css).removeClass('drag-mouse-over');
					$textarea.on('click.hg', function(){
						$textarea.val('').parent().removeClass('drag-mouse-down');
						$textarea.prev().val('');
						$drag.show('slow');
						$textarea.unbind('click.hg');
					});
					
					$('.drag-in-area p').eq(i).addClass('drag-mouse-down');
					unbindFunc();
					return
				}
			}
		};
        var unbindFunc = function(){
            $document.unbind('mousemove.hg');
            $document.unbind('mouseup.hg');
			$document.unbind('mouseup.textarea.hg');
            $html.css('cursor', htmlCursor);
        };
        $html.css('cursor', 'move');
        $drag.prop('hg-back', true);
        $drag.css({'position': 'relative','pointer-events': 'none'});
		$document.on('mouseup.textarea.hg', documentUpFunc);
        $document.on('mousemove.hg', dragMoveFunc);
        $document.on('mouseup.hg', dragUpFunc);
    });
});