$(document).ready(function(){
	$("button").click(function(){
		var val=$(".shuru").val();
		var arr=val.match(/[^\w,\s]+-\d+(.)?\d*(元|毛)/g);
		//var arr=val.split(",");
		var count=1;
		var value="";
		do{
		count=1;	
		for(var i=1; i<arr.length; i++){
			if(arr[0]==arr[i]){
				count++;
				arr.splice(i,1);
				i=i-1;
			}
		}
		var subarr=arr[0].split("-");
		if(subarr[1].search(/毛/)>0){
			var shu=subarr[1].match(/\d+/);
			subarr[1]=parseInt(shu[0])/10+"元";
		}
		value=value+subarr[0]+"("+count+"个"+")"+subarr[1]+'<br>';		
		arr.shift();
		}
		while(arr.length>0)
		$(".shuchu").html("");
		$(".shuchu").append(value);
	})
	
})
