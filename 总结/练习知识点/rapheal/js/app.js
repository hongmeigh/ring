$(function(){
	var paper=Raphael("my-canvas",600,600);
	console.log(paper);
	var paper1=Raphael("canvas1",600,600);
	//自定义属性
	paper.customAttributes.tianc=function(str){
		return {fill:str};
	}
	var anim=Raphael.animation({
		"transform":"0s2,2r230"
	},3000,"bounce")
	var rect=paper.rect(100,100,50,60,10).attr({
		"tianc":"#10f010",
		"stroke":"red",
		"strokewidth":2
	})
	rect.transform("s2,2r30");
	rect.animate(anim.repeat(Infinity).delay(1000));
	rect .mouseover(function(){
		rect.pause();
	}).mouseout(function(){
		rect.resume();
	})
	paper.add([ { type: "circle", cx: 40, cy: 40, r: 25 }, { type: "rect", x: 70, y: 30, width: 20, height: 20, fill: "#fc0" } ]);
	paper.ellipse(300,100,100,60).attr({
		"fill":"green",
		"stroke":"red",
		"strokewidth":2
	}).mouseover(function(){
		this.attr({"fill":"yellow"})
	})
	var dongh=paper.circle(500,100,60,60).attr({
		"fill":"orange",
		"stroke":"orange",
		"strokewidth":2
	})
	dongh.glow({
		"width":40,
		"fill":true,
		"opacity":0.5,
		"color":"#f0d310"
	})
	console.log(dongh.id+" "+dongh.node)
	dongh.drag(
		function(e,a,x1,y1,event){
		console.log(event);
		this.attr({"cx":500+e,"cy":100+a})		
		},
		function(e,a,event){ console.log(e+" "+a+" "+event.x);},
		function(e){console.log(e) }
		)
	dongh.onDragOver(function(){
		console.log("ok")
	})
	console.log(paper.getById(2))
	paper.image("images/timg.png",300,500,100,100)
	paper.path("m 424.26407,436.35527 -84.28047,-15.08756 -97.99739,55.85978 -11.69497,-84.81781 -83.40866,-75.93942 77.05258,-37.33273 46.44799,-102.79293 59.31609,61.74491 112.1151,12.40991 -40.39322,75.49318 z").attr({
		"fill":"#98f420",
		"stroke":"red",
		"strokewidth":2
	})
	paper1.path("m 424.26407,436.35527 -84.28047,-15.08756 -97.99739,55.85978 -11.69497,-84.81781 -83.40866,-75.93942 77.05258,-37.33273 46.44799,-102.79293 59.31609,61.74491 112.1151,12.40991 -40.39322,75.49318 z").attr({
				"fill":"#98f420",
				"stroke":"red",
				"strokewidth":2
			})
	var txt = paper.print(10, 50, "print", paper.getFont("微软雅黑"), 30).attr({fill: "#ab0803"});
	var line = paper1.path("M 408.57145,347.85714 78.932268,225.25297 199.68673,406.79086 214.42612,55.398593 79.088513,226.3412 417.83714,131.77302 213.43943,55.883473 408.0582,348.82938 417.07108,130.98445 198.60348,406.60317 z").attr({
				"fill":"#98f420",
				"stroke":"red",
				"strokewidth":2
			})
        var length = line.getTotalLength();
        $("#canvas1").animate({
            'to': 1
        }, {
            duration: 5000,
            easing:"linear",
            step: function(pos, fx) {
                var offset = length * fx.now;
                var subpath = line.getSubpath(0, offset);
				var cir=line.getPointAtLength(offset);
                paper1.clear();
                paper1.path(subpath).attr({
					"fill":"#f50b94",
					"stroke":"red",
					"strokewidth":2
                });
         }
	});

    var paper2=Raphael("canvas2",600,600);
    var c=paper2.path("m 277.14285,230.71428 c -6.98318,7.34397 -13.34478,-5.78994 -12.20616,-11.60651 3.08559,-15.76256 23.09975,-18.788 35.41919,-12.80582 22.03658,10.70072 25.32054,39.8465 13.40547,59.23187 -17.48586,28.4488 -56.81796,32.03987 -83.04455,14.00512 -34.95591,-24.03749 -38.83837,-73.86886 -14.60477,-106.85722 30.49551,-41.51249 90.95754,-45.67774 130.6699,-15.20443 48.09697,36.90727 52.54076,108.0675 15.80407,154.48257 -43.2929,54.69856 -125.1907,59.41863 -178.29524,16.40374 -61.3113,-49.6624 -66.3064,-142.32277 -17.00339,-202.10793 56.02122,-67.931698 159.46104,-73.201094 225.9206,-17.60304 74.55759,62.37262 80.10083,176.60385 18.20269,249.73328 C 342.692,439.57344 217.6606,445.39023 137.86471,377.18825 50.044149,302.12755 43.954004,166.28933 118.46271,79.829621 199.8624,-14.626359 346.51257,-20.989735 439.63402,59.827976 540.72732,147.56425 547.36384,305.03043 460.23532,404.81196 369.25675,509.00266 207.82953,519.53989 100.79829,433.86063")
    c.attr({
    	"stroke":"red",
    	"strokewidth":2
    })
    var length1 = c.getTotalLength();
    var img=paper2.image("images/timg.png",268.27238,245.95127,100,100)
    $("#canvas2").animate({
            'to': 1
        }, {
            duration: 15000,
            easing:"linear",
            step: function(pos, fx) {
                var offset = length1 * fx.now;
                var subpath = c.getSubpath(0, offset);
				var cir=c.getPointAtLength(offset);
				img.attr({
					x:cir.x-50,
					y:cir.y-50
				})
                
         }
	});
})