// JavaScript Document<script>
 var outter=10;
 function test(){
	 alert("javascript");
	 }
 function add(){
	var a=function(number1,number2){alert("参数的和为："+(number1+number2+outter));};
	return a(10,10);
	 }
  function add(){
	var a=(function(number1,number2){alert("参数的和为："+(number1+number2+outter));})(10,20);
	return a;
	 }
 function example(){
	 if(window.event.ctrlKey&&window.event.altKey&&window.event.shiftKey)
	  {
	   alert("大家好");
	   window.location.href="http://www.w3school.com.cn/jsref/jsref_events.asp";
	  }
 }
 document.onkeydown=example;

 function dianji(e){
	 if(event.button=1){
		alert("欢迎");
		 }
	 }
/* document.getElementById("image").onmousedown=dianji;
*/
function d(){
	 var a=event.clientX;
	 var b=event.clientY;
	 document.getElementById("mov").style.left=(a+"px");
	 document.getElementById("mov").style.top=(b+"px");
	 }
	 document.onclick=d;