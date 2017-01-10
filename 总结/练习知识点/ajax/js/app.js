$(function(){
	//分页器初始化
	$('#paging').pagination({
		pageCount:15,
		coping:true,
		homePage:'首页',
		endPage:'末页',
		prevContent:'上页',
		nextContent:'下页',
	});
	//为分页器的页数绑定事件
	$("body").on("mousedown","#paging a",function(){	
		if($(this).data("page")&&$(this).text()>0){
			var pagenum=parseInt($(this).text());
			getpagedata(pagenum);
			}
		
		})
 })
//用封装好的get函数获取json数据添加到各页中
 var getpagedataurl="data/news.json";
function getpagedata(pagenum){
	$get(getpagedataurl,{
			pagenum:pagenum
		},function(data){
			var htmlobj=$(".news-content").eq(0).clone();
			$(".cont-news-list").empty();
			for(var i=0; i<data.data.length; i++){
				//若没有这行最终循环出来的只有一条数据  因为append对同一地址的同一个对象只会添加一次 再次添加时若发现页	面存在这个对象 则只会改变其位置 并不会再次添加	
			    htmlobj=htmlobj.clone();
				htmlobj.find("img").attr("src",data.data[i].imgurl);
				htmlobj.find(".text span").text("时间："+data.data[i].datetime+" "+"第"+pagenum+"页");
				htmlobj.find(".text p").text("概要："+data.data[i].textcontent); 
				$(".cont-news-list").append(htmlobj);
				}
			
		})
	}