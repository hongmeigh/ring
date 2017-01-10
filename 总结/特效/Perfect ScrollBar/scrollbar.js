/*=================================
 * ScrollBar.js beta
 * Author:wuquanyao
 * Email:wqynqa@163.com
 *=================================*/
var ScrollBar = {};
(function(ScrollBar){
    var parent,root,track,bar,tx,ch,h,sh,rate;
    ScrollBar.adapter = function(config)
    {
        init(config);
    }
    function init(config)
    {
        parent = document.querySelector(config['selector']);
        root   = parent.parentNode;
        createBar();
        mouseaction();
    }
    function createBar()
    {
        track = document.createElement('div');
        track.setAttribute('class','scroll-track');
        bar   = document.createElement('div');
        bar.setAttribute('class','scroll-bar');
        track.appendChild(bar);
        root.appendChild(track);
        sh = root.scrollHeight;
        ch = root.offsetHeight;
        tx = root.offsetTop;
        h  = ch/sh*ch;
        if(h<30){
            bar.style.height = '30px';
            h = 30;
        }else{
            bar.style.height = h+'px';
        }
        rate = (sh-ch)/(ch-h);
    }
    function mouseaction()
    {
        function eventparse(obj,type,func){
            if(document.attachEvent){
                var events = {
                    click:'onclick',
                    mouseover:'onmouseover',
                    mousemove:'onmousemove',
                    mouseout:'onmouseout',
                    mousedown:'onmousedown',
                    mouseup:'onmouseup',
                    wheel:'DOMMouseScroll'
                };
                obj.attachEvent(events[type],func);
            }else{
                var events = {
                    click:'click',
                    mouseover:'mouseover',
                    mousemove:'mousemove',
                    mouseout:'mouseout',
                    mousedown:'mousedown',
                    mouseup:'mouseup',
                    wheel:'DOMMouseScroll'
                };
                obj.addEventListener(events[type],func,false);
            }
        }
        
        function init(){
            var bool = false,v;
            eventparse(bar,'mousedown',function(event){
                bool  = true;
            });            
            eventparse(document,'mousemove',function(event){
                if(bool){
                    if(event.clientY<=(tx+10)){
                        v = 0;
                    }else if(event.clientY>=(tx+ch-h)){
                        v = tx+ch-h;
                    }else{
                        v = event.clientY;
                    }
                    parent.style.transform = 'translate(0px,'+(-v*rate)+'px)'; 
                    bar.style.transform = 'translateY('+v+'px)';
                }
            });
            eventparse(document,'mouseup',function(event){ 
                bool = false;
            });
            // eventparse(track,'click',function(event){
            //     event.stopPropagation();
            //     bar.style.transition = 'all 0ms ease 0ms';
            //     if(event.clientY<(tx+h)){
            //         bar.style.transform = 'translate(0px,0px)';
            //     }else if(event.clientY>=(tx+ch-h)){
            //         bar.style.transform = 'translate(0px,'+(tx+ch-h)+'px)';
            //     }else{
            //         bar.style.transform = 'translate(0px,'+(event.clientY-h/2)+'px)';
            //     }
            //     parent.style.transform = 'translate(0px,'+((-event.clientY+tx)*rate)+'px)'; 
            // });
            var offset=0;
            if (window.navigator.userAgent.indexOf("Firefox") >= 0) {
                eventparse(parent,'wheel',wheelEvent);    
            }else{
                parent.onmousewheel=parent.onmousewheel=wheelEvent;
            }
            function wheelEvent(e){
                var transform,bO,wv = (e.detail/3*20) || (-(e.wheelDelta/120*20));
                if((offset<(sh-ch) &&(offset>=0))){
                    transform = 'translate(0px,'+(-offset)+'px)'; 
                    bO = 'translateY('+(offset/rate)+'px)';
                    offset = ((offset+wv)>(sh-ch))?offset:( ((offset+wv)<=0)?0:(offset+wv) );
                }
                bar.style.transform = bO;
                parent.style.transform = transform; 
            }
        }
        init();
    }
})(ScrollBar);