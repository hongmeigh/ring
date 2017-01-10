$(function(){
	var mySwiper = new Swiper ('.contwrap', {
    direction: 'vertical',
    loop: false,
    onInit: function(swiper){
    	swiperAnimateCache(swiper);
    	swiperAnimate(swiper);
    }, 
    onSlideChangeEnd: function(swiper){ 
    	swiperAnimate(swiper);
        if(swiper.activeIndex==3){
            $(".cas1,.cas2,.cas3").fadeIn(1000);
            setTimeout(function(){              
                drawcas(ctx1,canvas1,maxangle1,0,$(".cas1 b"))
                drawcas(ctx2,canvas2,maxangle2,0,$(".cas2 b"))
                drawcas(ctx3,canvas3,maxangle3,1,$(".cas3 b")) 
            },1000)
            
        }else{
            $(".cas1,.cas2,.cas3").hide();
            ctx1.clearRect(0,0,canvas1.width,canvas1.height);
            ctx2.clearRect(0,0,canvas2.width,canvas2.height);
            ctx3.clearRect(0,0,canvas3.width,canvas3.height);
            $(".cas1 b,.cas2 b,.cas2 b").html("0%")
        }
        if(swiper.activeIndex==10){
            $(".tupian").css("height",$(".kuangout").height());
        }
    }     
  }) 

    $(".sharebtn").click(function(){
        $(".sharebg").show();
    })
    $(".sharebg").click(function(){
        $(".sharebg").hide();
    })

  var width=$(".cas1").width();
  $(".cas1").css("height",width);
  var canvas1=$("#percas1")[0];
  canvas1.width=2*width;
  canvas1.height=2*width;
  var maxangle1=0.8;
  var ctx1=canvas1.getContext("2d")

  var width=$(".cas2").width();
  $(".cas2").css("height",width);
  var canvas2=$("#percas2")[0];
  canvas2.width=2*width;
  canvas2.height=2*width;
  var maxangle2=0.6;
  var ctx2=canvas2.getContext("2d")

  var width=$(".cas3").width();
  $(".cas3").css("height",width);
  var canvas3=$("#percas3")[0];
  canvas3.width=2*width;
  canvas3.height=2*width;
  var maxangle3=0.35;
  var ctx3=canvas3.getContext("2d")

  function drawcas(ctx,canvas,maxangle,three,selfb){
    var angle=0;
    window.requestAnimationFrame(function(){
        cir(ctx,canvas,angle,maxangle,three,selfb)
    })   
  }
  function cir(ctx,canvas,angle,maxangle,three,selfb){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(three){
        cirbg(ctx,canvas)
    }
    angle=angle+0.01;
    ctx.beginPath();
    ctx.arc(canvas.width/2,canvas.height/2,canvas.width/2-10,1.5*Math.PI,(1.5-angle*2)*Math.PI,true);
    ctx.strokeStyle="#d2dde4";
    ctx.lineWidth=10;
    ctx.stroke();
    ctx.closePath();
    selfb.html(parseInt(angle*100)+"%")
    if(angle<=maxangle){
        window.requestAnimationFrame(function(){
            cir(ctx,canvas,angle,maxangle,three,selfb)
        })
    }
  }
  function cirbg(ctx,canvas){
    ctx.beginPath();
    ctx.arc(canvas.width/2,canvas.height/2,canvas.width/2-10,0,2*Math.PI);
    ctx.strokeStyle="#85a8b9";
    ctx.lineWidth=10;
    ctx.stroke();
    ctx.closePath();
  }
})
window.onload=function(){
    $(".tupian").css("height",$(".kuangout").height());
        var mySwiper1 = new Swiper ('.tupian', {
            direction: 'horizontal',
            autoplay : 2000,
            loop: true,  
            speed:600,
            autoplayDisableOnInteraction:false 
         }) 
}