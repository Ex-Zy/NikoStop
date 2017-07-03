$(document).ready(function() {
	'use strict';

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

});