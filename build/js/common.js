$(document).ready(function() {
  'use strict';
   $(".regular").slick({
          dots: true,        
          slidesToShow: 2,
          slidesToScroll: 2,
          autoplay: true,
    		autoplaySpeed: 3000,
        infinite: true,
        responsive: [
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,       
          dots: true
        }
      }]
   });   

 $(window).scroll(function(){
      if ($(this).scrollTop() > $('.why-not').offset().top) {
          $('.navbar').addClass('fixed');
      } else {
          $('.navbar').removeClass('fixed');
      }
  });        

	var scene1 = $('#scene-1').get(0);
	var scene2 = $('#scene-2').get(0);
	var scene3 = $('#scene-3').get(0);

	var parallax1 = new Parallax(scene1);
	var parallax2 = new Parallax(scene2);
	var parallax3 = new Parallax(scene3);



  if(document.documentMode) {
    $(".graf").addClass("ie-detected");
  }

  function getScrolled(Objs) {
    var objsLength = Objs.length, i;
    for (var i = 0; i < objsLength; i++) {
      if(Objs[i].scrollTop > 0) {
        return Objs[i].scrollTop;
      }
      continue;
    }
    return 0;
  }

  $(window).on("scroll", function(){
    var scrolledTop = getScrolled(document.querySelectorAll("html, body")),
        scrolledBottom = scrolledTop + window.innerHeight,

        $elem = $(".graf"),
        $elInfo = $elem.offset(),
        $elemTop = $elInfo.top,
        $elemBottom = $elemTop + $elem.innerHeight();

    if(scrolledBottom >= $elemTop && scrolledTop <= $elemBottom) {
      $elem.addClass("is-animated");
    } else {
      $elem.removeClass("is-animated");
    }
  });
});