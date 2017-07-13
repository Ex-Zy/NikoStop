
$(document).ready(function() {
  "use strict";
  /******************* mobile menu ****************/   
  
  /******************************************/   
//pop-up
  $("a.modal_button").click( function(event){ 
    event.preventDefault();
    $("#overlay").css("display", "block");
    $(".navbar").removeClass('fixed');
    $(".out").addClass("out-blur");
    $(".popup") 
      .css("display", "block")
      .animate({opacity: 1, top: "50%"}, 400); 
    });
   //Зaкрытие мoдaльнoгo oкнa
  $(".popup__close").click( function(){    
    $(".popup")
      .animate({opacity: 0, top: "-300px"}, 500,  
        function(){ 
          $(this).css("display", "none"); 
          $("#overlay").css("display", "none");
          $(".out").removeClass("out-blur");           
        }
      );
  });     
  //гамбургер
  $(".btn-mobile-menu").click(function(){
    $("#overlay").css("display", "block");
    $(".out").addClass("out-blur");
    $('.navbar').addClass('fixed-mobile');
  });
  //закрыть гамбургер
  function closeMobileMunu(){
      $(".navbar").removeClass("fixed-mobile");
      $("#overlay").css("display","none");
      $(".out").removeClass("out-blur");
  }
  $(".navbar__close").click( function(){    
      closeMobileMunu();
  });
  //развернуть блок
   $(".btn-expand").click(function(e){ 
     e.preventDefault();    
     $(".expert-block-wrap").fadeIn(700);
     $(this).parent().css("display","none");    
  });
   //навигация по сайту
   $(".js-scroll").click(function(e){
      e.preventDefault();
      var el = $(this).attr("href");
      if($(this).parents("ul").attr("id") === "fixed-nav"){         
         $("#fixed-nav li").removeClass("is-active");
         $(this).parent().addClass("is-active");        
         if($(window).width()<768){
            closeMobileMunu();
         }
      }
      $("html, body").animate({
            scrollTop: $(el).offset().top - ($(window).height()/4)}, 900);
        return false;
    }); 

   /******************* scroll ****************/ 
$(window).scroll(function(){
      var btnTop = $(".top-drops .js-btn").offset().top; 
      var btnBottom = $(".bottom-drops .js-btn").offset().top;      
      if ($(this).scrollTop() > btnTop && $(this).width()>767) {
          $(".navbar").addClass("fixed");                         
          if ($(this).scrollTop() > (btnBottom - $(window).height())){
            $(".navbar").removeClass("fixed");
          }    
      } else {
          $(".navbar").removeClass("fixed");
      } 
// изменение пунктов меню при прокрутке
var lastId,
    topMenu = $("#fixed-nav"), 
    menuItems = topMenu.find("a"),  
    scrollItems = menuItems.map(function() {
      var item = $($(this).attr("href"));
      if (item.length) {
        return item;
      }
  }); 

var fromTop = $(this).scrollTop() + ($(window).height()/3);
var cur = scrollItems.map(function() {
  if ($(this).offset().top < fromTop)
        return this;
  });  
cur = cur[cur.length - 1];
  var id = cur && cur.length ? cur[0].id : "";
  if (lastId !== id) {
       lastId = id;    
       menuItems
         .parent().removeClass("is-active")
         .end().filter("[href='#" + id + "']").parent().addClass("is-active");
   }    
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
 /*************** effective *****************/ 
	var scene1 = $("#scene-1").get(0);
	var scene2 = $("#scene-2").get(0);
	var scene3 = $("#scene-3").get(0);
  var scrollWidth = getScrollWidth();
  var notMobile = ($(window).width() + scrollWidth) > 767;
  
  function initParallax() {
    if(notMobile) {
      new Parallax(scene1);
      new Parallax(scene2);
      new Parallax(scene3);
    }
  }

  function getScrollWidth() {
      var block = $('<div>').css({'height':'50px','width':'50px'}),
          indicator = $('<div>').css({'height':'200px'});

      $('body').append(block.append(indicator));
      var w1 = $('div', block).innerWidth();    
      block.css('overflow-y', 'scroll');
      var w2 = $('div', block).innerWidth();
      $(block).remove();
      return (w1 - w2);
  }

  initParallax();

  $('.js-dropdown').click(function(e) {
    e.preventDefault();
    $(this).closest('.e-dropdown').addClass('is-drop');
    $('.shadow').hide();
  });
 /*************** graf *****************/ 
 
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
/*******************************/
});
/*********** counter ***************/
function rand(min, max){
  return (max-min)*Math.random()+min;
}
function productCounter(){
  var counter = $(".top-bottom-content__counter:eq(0)").text();
  counter = +counter- 1;
  if(counter <= 9){
    counter="0"+ counter;
    if(+counter == 5){
      clearTimeout(timerId);
    }     
  }
  $(".top-bottom-content__counter").text(counter);
}
var timerId = setInterval("productCounter()" , rand(1000, 3000) );
/**********************************/

