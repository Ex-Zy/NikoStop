$(document).ready(function() {
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
});

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
      $elInfo = $elem.offset();
      $elemTop = $elInfo.top,
      $elemBottom = $elemTop + $elem.innerHeight();

  if(scrolledBottom >= $elemTop && scrolledTop <= $elemBottom) {
    $elem.addClass("is-animated");
  } else {
    $elem.removeClass("is-animated");
  }
});