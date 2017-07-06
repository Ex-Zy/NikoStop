$(document).ready(function() {
	'use strict';

	// var WIN_WIDTH = $(window).width();
	// var WIN_HEIGHT = $(window).height();

	// function showParallax(moveForce) {
	// 	$('.js-parallax-section').mousemove(function(e) {
			
	// 		var moveX = (e.pageX - WIN_WIDTH/2) / (WIN_WIDTH/2) * -moveForce;
	// 		var moveY = (e.pageY - WIN_HEIGHT/2) / (WIN_HEIGHT/2) * -moveForce;


	// 		$('.js-parallax-1').css({
	// 			'right': (moveX * 6) +'px',
	// 			'bottom': (moveY * 6)+'px'
	// 		});

	// 		$('.js-parallax-2').css({
	// 			'left': (moveX * 20) +'px',
	// 			'top': (moveY * 20)+'px'
	// 		});

	// 		$('.js-parallax-3').css({
	// 			'right': (moveX * 15) +'px',
	// 			'bottom': (moveY * 15)+'px'
	// 		});

	// 		$('.js-parallax-4').css({
	// 			'left': (moveX * 12) +'px',
	// 			'top': (moveY * 12)+'px'
	// 		});

	// 		$('.js-parallax-5').css({
	// 			'left': (moveX * 25) +'px',
	// 			'top': (moveY * 25)+'px'
	// 		});

	// 	});
	// }
	// showParallax(2);
	// $('.js-parallax-1').jKit('parallax', { 'strength': '1', 'axis': 'both'});
	// $('.js-parallax-2').jKit('parallax', { 'strength': '2', 'axis': 'both'});
	// $('.js-parallax-2').jKit('parallax', { 'strength': '5', 'axis': 'y', 'detect': 'scroll' });
	var scene1 = $('#scene-1').get(0);
	var scene2 = $('#scene-2').get(0);
	var scene3 = $('#scene-3').get(0);

	var parallax1 = new Parallax(scene1, {
		invertX: false,
		invertY: false,
	});
	var parallax2 = new Parallax(scene2);
	var parallax3 = new Parallax(scene3);



});