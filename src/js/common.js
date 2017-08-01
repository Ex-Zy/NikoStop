$(document).ready(function() {
	"use strict";
	//variables
	var body = $("body"),
			navbar = $(".navbar"),
			overlay = $("#overlay"),
			mainContent = $(".out"),

			jsNavbarPoint = $(".js-navbar-show"),
			jsNavbarShow = jsNavbarPoint.offset().top + jsNavbarPoint.innerHeight(),

			graf = $(".graf"),
			grafTop = graf.offset().top,
			grafBottom = graf.offset().top + graf.innerHeight(),

			topMenu = $("#fixed-nav"),
			topMenuItems = topMenu.find("li"),

			windowWidth = window.innerWidth,
			windowHeigth = window.innerHeight,
			mobileWidth = 767,

			mobileMenuBtn = $(".btn-mobile-menu"),
			mobileCloseMenuBtn = $(".navbar__close"),

			modalBtn = $(".modal_button"),
			modalBtnClose = $(".popup__close"),
			modal = $(".popup"),

			counter = $(".js-counter"),
			timerId = setInterval(productCounter, rand(10000, 20000) ),

			scene1 = $("#scene-1").get(0),
			scene2 = $("#scene-2").get(0),
			scene3 = $("#scene-3").get(0),

			fixedPaddingTop;

	sizePaddingTop();

	//set counter of packs
	if(localStorage) {
		var localCounter = localStorage.getItem("counter")
		if(localCounter != null && localCounter == NaN) {
			counter.text(localCounter);
		}
	} else {
		counter.text(83);
	}

	//ie detect
	if(document.documentMode) {
		graf.addClass("ie-detected");
	}

	//slider
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

	//functions
	function animateScroll(element, speed) {
		$("html, body").animate({
			scrollTop: element.offset().top - fixedPaddingTop + 1
		}, speed);
	};

	function abs(num) {
		return (num < 0) ? -num : num;
	};

	function updateSizeElements() {
		jsNavbarShow = jsNavbarPoint.offset().top + jsNavbarPoint.innerHeight();
		grafTop = graf.offset().top;
		grafBottom = grafTop + graf.innerHeight();
		windowWidth = window.innerWidth;
		windowHeigth = window.innerHeight;
		sizePaddingTop();
	};

	function switchMenuItems(scrolled) {
		topMenuItems.each(function() {
			var link = $(this).find("a"),
					idSection = link.attr("href"),
					sectionTop = $(idSection).offset().top - fixedPaddingTop,
					sectionBottom = sectionTop + $(idSection).innerHeight();

			if(scrolled >= sectionTop && scrolled <= sectionBottom) {
				topMenuItems.removeClass("is-active");
				$(this).addClass("is-active");
				return;
			}
		});
		return;
	};

	function closePopup() {
		modal.removeClass("is-show").hide(300);
		if(windowWidth > mobileWidth) {
			navbar.addClass("fixed");
		}
	};

	function closeMobileMenu() {
		navbar.removeClass("fixed");

	};

	function removeOverlay() {
		overlay.hide();
		mainContent.removeClass("out-blur");
		body.removeClass("is-modal");
	};

	function rand(min, max){
		return (max-min)*Math.random()+min;
	}

	function productCounter(){
		var counterText = +counter.eq(0).text();
		if(counterText == 5) {
			clearTimeout(timerId);
			return;
		} else {
			var c = counterText - 1;
			if(c <= 9) {
				c = "0"+ c;
			}
			if(localStorage) {
				localStorage.setItem("counter", c);
			}
			counter.text(c);
		}
	}

	function initParallax() {
		new Parallax(scene1);
		new Parallax(scene2);
		new Parallax(scene3);
	}
	initParallax();

	function sizePaddingTop() {
		if(windowWidth > mobileWidth) {
			fixedPaddingTop = 76;
		} else {
			fixedPaddingTop = 0;
		}
	}

	//resize window
	$(window).on("resize", function() {
		updateSizeElements();
	});

	//on scroll
	$(window).on("scroll", function() {
		var scrolledTop = $(window).scrollTop(),
				scrolledBottom = scrolledTop + windowHeigth;

		if(windowWidth > mobileWidth) {
			if(scrolledTop >= jsNavbarShow) {
				navbar.addClass("fixed");
			} else {
				navbar.removeClass("fixed");
			}

			if(scrolledBottom >= grafTop && scrolledTop <= grafBottom) {
				graf.addClass("is-animated");
			} else {
				graf.removeClass("is-animated");
			}

			switchMenuItems(scrolledTop);
		}
	});

	//on click
	$(".js-scroll").on("click", function(e) {
		e.preventDefault();
		if($(this).hasClass("js-to-form")) {
			var forms = $(".block-form:visible"),
					formsLength = forms.length,
					closestForm = $(forms[0]),
					closestFormOffset = abs($(window).scrollTop() - closestForm.offset().top),
					i;
			for(i = 1; i < formsLength; i++) {
				var top = abs($(window).scrollTop() - $(forms[i]).offset().top);
				if(top < closestFormOffset) {
					closestFormOffset = top;
					closestForm = $(forms[i]);
				}
			}
			animateScroll(closestForm, 900); 
		} else {
			var id = $(this).attr("href");
			animateScroll($(id), 900);
		}

		if($(this).hasClass("js-mob-menu-scroll") && windowWidth <= mobileWidth) {
			closeMobileMenu();
			removeOverlay();
		}
	});

	mobileMenuBtn.on("click", function() {
		navbar.addClass('fixed');
		overlay.show();
		mainContent.addClass("out-blur");
		body.addClass("is-modal");
	});

	mobileCloseMenuBtn.on("click", function(){
		closeMobileMenu();
		removeOverlay();
	});

	modalBtn.on("click", function() {
		navbar.removeClass('fixed');
		body.addClass("is-modal");
		overlay.show();
		mainContent.addClass("out-blur");
		modal.show(0, function() {
			$(this).addClass("is-show");
		});
	});

	modalBtnClose.on("click", function() {
		if (windowWidth <= mobileWidth) {
			if (!navbar.hasClass("fixed")) {
				removeOverlay();
			}
		} else {
			removeOverlay();
		}
		closePopup();
	});

	overlay.on("click", function() {
		if(windowWidth <= mobileWidth && !modal.hasClass("is-show")) {
			closeMobileMenu();
			removeOverlay();
		} else if (!navbar.hasClass("fixed")) {
			closePopup();
			removeOverlay();
		}
	});
	
	$(".js-dropdown").click(function(e){ 
		e.preventDefault();   
		$(this).parent().css("display","none");
		$(this).parent().prev().addClass('is-drop');
	});
});