/* 代码整理：懒人之家 www.lanrenzhijia.com */
(function(win, doc) {

   var img;
   var timer = [];
   var block = false;
   var slide = 1;
   var slides = 7;
   var dirs = ['up', 'right', 'down', 'left'];

   function byId(id) {
     return doc.getElementById(id);
   }

   function qAll(sel) {
     return doc.querySelectorAll(sel);
   }

   function each(arr, callback) {
     [].forEach.call(arr, callback);
   }

   function image(n) {
     var url = 'images/minion_';
     url += n;
     url += '.jpg';
     return url;
   }

   function imageUrl(n) {
     var url = 'url(';
     url += image(n);
     url += ')';
     return url;
   }

   function preloadImages(images) {
     var div = doc.createElement('div');
     var bg = '';
     for (var i = 1; i <= images; i++) {
       bg += imageUrl(i);
       bg = i < images ? bg + ',' : bg;
     }
     div.style.backgroundImage = bg;
     div.style.opacity = '0';
     div.style.position = 'absolute';
     div.style.height = '0';
     div.style.width = '0';
     div.style.top = '0';
     div.style.left = '0';
     document.body.appendChild(div);
   }

   function overlay() {
     img = doc.createElement('div');
     img.style.backgroundImage = imageUrl(slide);
     img.classList.add('overlay');
     byId('wall').appendChild(img);
   }

   function updateSlides(elm, add) {
     var current = slide + add;
     current = current < 1 ? slides : current;
     current = current > slides ? 1 : current;
     each(elm.querySelectorAll('.front'), function(el, i) {
       el.style.backgroundImage = imageUrl(current);
     });
     each(elm.querySelectorAll('.bottom, .right, .top, .left'), function(el, i) {
       var nextSlide = current > slides - 1 ? 1 : current + 1;
       if (add > 0) {
         nextSlide = current < 2 ? slides : current - 1;
       }
       el.style.backgroundImage = imageUrl(nextSlide);
     });
   }

   function setSides(n) {
     img.style.opacity = '0';
     each(qAll('.cube'), function(el, i) {
       updateSlides(el, n);
       var rand = parseInt((Math.random() * 4), 10);
       var dir = dirs[rand];
       el.classList.add('sliding');
       el.classList.add(dir);
     });
   }

   function stop() {
     each(timer, function(el, i) {
       clearTimeout(timer[i]);
     });
   }
   
   function next(n) {
     if (block) {
       return false;
     }
     block = true;
     
     if (n < 0) {
       slide = slide > slides - 1 ? 0 : slide;
       slide++;
     } else if (n > 0) {
       slide = slide < 2 ? slides + 1 : slide;
       slide--;
     }
     setSides(n);
   }

   each(qAll('.cube'), function(el, i) {
     el.addEventListener('animationend', function() {
       el.className = 'cube';
       img.style.backgroundImage = imageUrl(slide);
       updateSlides(el, 0);
       if (i == qAll('.cube').length - 1) {
         block = false;
         img.style.opacity = '1';
       }
     });
   });


   byId('next').addEventListener('click', function() {
     stop();
     next(-1);
   });

   byId('prev').addEventListener('click', function() {
      stop();
      next(1);
   });


   function delaySlide(n, int) {
     timer[n] = setTimeout(function() {
       next(-1);
     }, int * (n + 1));
   }

   function play(n, int) {
     for (var i = 0; i < n; i++) {
       delaySlide(i, int);
     }
   }

   preloadImages(slides);
   overlay();
   play(slides, 3000);

 })(window, document);