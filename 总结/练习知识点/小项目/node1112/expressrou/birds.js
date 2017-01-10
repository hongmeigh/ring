var express=require('express');
var router=express.Router();


router.use(function date(req,res,next){
	console.log(new Date());
	next();
})

router.get('/',function(req,res){
	console.log("这是内容1");
	res.send("hello")
})

router.get('/about',function(req,res){
	console.log("这是内容2");
	res.send("world")
})



module.exports=router;