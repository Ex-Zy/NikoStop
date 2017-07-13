$(document).ready(function() {
  'use strict';
  /******************* scroll ****************/
   $('.js-scroll').click(function(e){
      e.preventDefault();
      var el = $(this).attr('href');
      if($(this).parents('ul').attr('id') == 'fixed-nav'){
         $('#fixed-nav a').removeClass("is-active");
         $(this).addClass('is-active');
      }            
      $('html, body').animate({
            scrollTop: $(el).offset().top - ($(window).height()/4)}, 900);
        return false;
    });
  /***********************************/   
  /************* slider **************/
   $(".regular").slick({
          dots: true,        
          slidesToShow: 2,
          slidesToScroll: 2,
          autoplay: true,
    		autoplaySpeed: 3000,
        infinite: true,
        responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,       
          dots: true
        }
      }]
   });  
 /********************************/   
/************* menu **************/
 $(window).scroll(function(){
      var btnTop = $('.top-drops .js-btn').offset().top; 
      var btnBottom = $('.bottom-drops .js-btn').offset().top; 
      if ($(this).scrollTop() > btnTop) {
          $('.navbar').addClass('fixed');
          if ($(this).scrollTop() > (btnBottom - $(window).height())){
            $('.navbar').removeClass('fixed');
          }    
      } else {
          $('.navbar').removeClass('fixed');
      }
  });        
 /********************************/ 
	var scene1 = $('#scene-1').get(0);
	var scene2 = $('#scene-2').get(0);
	var scene3 = $('#scene-3').get(0);

	var parallax1 = new Parallax(scene1);
	var parallax2 = new Parallax(scene2);
	var parallax3 = new Parallax(scene3);

    $('.js-dropdown').click(function(e) {
      e.preventDefault();
      $(this).closest('.e-dropdown').addClass('is-drop');
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
 /*************** graf *****************/ 
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
/*******************************/
});
/*********** counter ***************/
function rand(min, max){
  return (max-min)*Math.random()+min;
}
function productCounter(){
  var counter = $('.top-bottom-content__counter:eq(0)').text();
  counter = +counter- 1;
  if(counter <= 9){
    counter='0'+ counter;
    if(+counter == 5){
      clearTimeout(timerId);
    }     
  }
  $('.top-bottom-content__counter').text(counter);
}
var timerId = setInterval('productCounter()' , rand(1000, 3000) );
/**********************************/


$(document).ready(function() { 
  $('a.modal_button').click( function(event){ 
    event.preventDefault();
    $('#overlay').fadeIn(400, 
      function(){ 
        $('.guarantee-popup') 
          .css('display', 'block')
          .animate({opacity: 1, top: '18px'}, 200); 
    });
  });
  /* Зaкрытие мoдaльнoгo oкнa*/
  $('.guarantee-popup__close, #overlay').click( function(){ 
    $('.guarantee-popup')
      .animate({opacity: 0, top: '-300px'}, 500,  
        function(){ 
          $(this).css('display', 'none'); 
          $('#overlay').fadeOut(400); 
        }
      );
  });
});