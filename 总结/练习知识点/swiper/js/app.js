$(document).ready(function(){
	var mySwiper = new Swiper('.swiper-container', {
    direction: 'vertical',
	mousewheelControl:true,
    //initialSlide :0,
    //slidesPerView : 3,
	//slidesPerGroup : 3,
	//slidesPerColumn:2,
	pagination : '.swiper-pagination',
	paginationType:'bullets',
	paginationClickable:true,
	//paginationBulletRender: function (index, className) {
      //return '<span class=' + className + '>' + (index + 1) + '</span>';
  //},
    //prevButton:'.swiper-button-prev',
    //nextButton:'.swiper-button-next',
    //scrollbar:'.swiper-scrollbar',
	//spaceBetween:5,
    speed:500,
    //autoplay:1500,
    //autoplayDisableOnInteraction:false,
    loop: false,
    onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
    swiperAnimateCache(swiper); //隐藏动画元素 
    swiperAnimate(swiper); //初始化完成开始动画
  }, 
  onSlideChangeEnd: function(swiper){ 
    swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
  },
  //onTouchStart: function(mySwiper,even){
      //alert('事件触发了;');
    //}

    
    // 如果需要分页器
    //pagination: '.swiper-pagination'
    
    // // 如果需要前进后退按钮
    // nextButton: '.swiper-button-next',
    // prevButton: '.swiper-button-prev',
    
    // // 如果需要滚动条
    // scrollbar: '.swiper-scrollbar',
  }) 

})