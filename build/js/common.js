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