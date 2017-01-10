$(document).ready(function(){
	var arr=[];
	var str;
	var pand=false;
	$("button").not(".deng").click(function(){
		str=$(this).text();
		arr.push(str);
		if(arr[0]=="+"||arr[0]=="-"||arr[0]=="*"||arr[0]=="/"){
			arr.unshift(0);
		}
		if(str==0){
			if(pand){
				arr.splice(0,arr.length);
				$(".shuru").val(0);
				return;
			}
			pand=false;
		}
		$(".shuru").val(arr.join(""));
		pand=false;
	})
	$(".deng").click(function(){
		pand=true;
		$(".shuru").val(eval(arr.join("")));
		arr.splice(0,arr.length,eval(arr.join("")))
	})
})
