$(function($){
	$.supersized({
		// Functionality
		slide_interval      :   5000,		// Length between transitions
		transition          :   1, 			// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
		transition_speed	:	2000,		// Speed of transition

		// Components
		slide_links			:	'false',
		slides 				:  	[			// Slideshow Images
										{image : '/html/img/background_img.jpg'},
										{image : '/html/img/background_img2.jpg'},
										{image : '/html/img/background_img3.jpg'}
								]
	});
});
