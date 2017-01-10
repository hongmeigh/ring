function parseJSONStr(data){
  return (typeof data == 'string' ? $.parseJSON(data) : data) 
}
//封装get和post函数
function $post(url,param,sucfun,failfun){
	 $.ajax({
		 url:url,
		 type:"POST",
		 data:param,
		 contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
     dataType: 'json',
		 success:function(data){
			 sucfun(data);
			 },
		 error:function(){
			 failfun?failfun():alert("服务器请求失败，请稍后再试")
			 }
		 })
	 }
 function $get(url,param,sucfun,failfun){
	 $.ajax({
		 url:url,
		 type:"GET",
		 data:param,
		 contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
     dataType: 'json',
		 success:function(data){
			 sucfun(data);
			 },
		 error:function(){
			 failfun?failfun():alert("服务器请求失败，请稍后再试")
			 }
		 })
	 }