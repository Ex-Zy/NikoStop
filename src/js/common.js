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
      if ($(this).scrollTop() > $('.sect2').offset().top) {
          $('.navbar').addClass('fixed');
      } else {
          $('.navbar').removeClass('fixed');
      }
  });        

	var WIN_WIDTH = $(window).width();
	var WIN_HEIGHT = $(window).height();

	function showParallax(moveForce1, moveForce2) {
		$('.js-parallax-section').mousemove(function(e) {
			
			var moveX1 = (e.pageX - WIN_WIDTH/2) / (WIN_WIDTH/2) * -moveForce1;
			var moveY1 = (e.pageY - WIN_HEIGHT/2) / (WIN_HEIGHT/2) * -moveForce1;

			var moveX2 = (e.pageX - WIN_WIDTH/2) / (WIN_WIDTH/2) * -moveForce2;
			var moveY2 = (e.pageY - WIN_HEIGHT/2) / (WIN_HEIGHT/2) * -moveForce2;

			$('.js-parallax-1').css({
				'right': moveX1 +'px',
				'bottom': moveY1+'px'
			});

			$('.js-parallax-2').css({
				'left': (moveX2 * 7)+'px',
				'top': (moveY2 * 7)+'px',
			});

		});
	}
	showParallax(10, 2);

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