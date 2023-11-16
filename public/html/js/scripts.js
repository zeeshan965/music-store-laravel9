/*
* Author: Wisely Themes
* Author URI: http://themeforest.net/user/wiselythemes
* Theme Name: Beat
* Version: 1.0.6
*/

/* global Modernizr:true, google:true, myConcerts:true, myPlaylist:true, RichMarker:true */

var Beat = {

	initialized: false,
	mobMenuFlag: false,
	wookHandler: null,
	wookOptions: null,
	scrollPos: 0,
	sendingMail: false,
	myLatlng: null,

	init: function() {
		"use strict";
		
		var $tis = this;
		
		if ($tis.initialized){
			return;
		}
		
		$tis.initialized = true;
		$tis.construct();
		$tis.events();
	},

	construct: function() {
		"use strict";
		
		var $tis = this;
		
		/**
		 * Navigation
		 */
		$tis.navigation();
		
		/**
		 * Dinamically create the menu for mobile devices
		 */
		$tis.createMobileMenu();
		
		/**
		 * Social stream items navigation
		 */
		$tis.socialStream();
		
		/**
		 * Create Mp3 Player
		 */
		$tis.createMp3Player();
		
		/**
		 * Activate placeholder in older browsers
		 */
		$('input, textarea').placeholder();
		
		/**
		 * Initialize Google Maps and populate with concerts locations
		 */
		$tis.googleMap();
		
		/**
		 * Start FlexSlider
		 */
		$tis.startFlexSlider();
		
		/**
		 * Start NiceScroll
		 */
		$tis.startNiceScroll();

		/**
		 * Create PrettyPhoto links
		 */
		$("a[data-gal^='prettyPhoto']").prettyPhoto({theme:'beat', hook:'data-gal'});

	},

	events: function() {
		"use strict";
		var $tis = this;
		
		/**
		 * Check if browser is a mobile device
		 */
		$tis.isMobile();
		
		/**
		 * Functions called on window resize
		 */
		$tis.windowResize();
		
		/**
		 * Resize logo on window resize
		 */
		$tis.resizeLogo();
		
		/**
		 * Overlay open/close buttons
		 */
		$tis.overlayButtons();
		
		/**
		 * Resize embed videos
		 */
		$tis.resizeVideos();
		
		/**
		 * Contact form submit
		 */
		$tis.contactForm();
		
		/**
		 * Capture buttons click event
		 */
		$tis.buttons();
		
	},
	
	navigation: function() {
		"use strict";
		
		$('#nav li a, .nav-logo').bind('click',function(event){
			var navActive = $(this);
			var scroll = 0,
				navAnchor = $(this).attr('href');
			
			if (navActive.attr('href') !== "#home" &&  ($(navAnchor).offset() != undefined)){
				scroll = $(navActive.attr('href')).offset().top -65;
			} else if ( $(navAnchor).offset() == undefined ){
				navActive.blur();
				return false;
			}
			
			$('html, body').stop().animate({
				scrollTop: scroll
			}, 1500,'easeInOutExpo', function(){
				navActive.blur();
			});
			
			event.preventDefault();
		});
		
		$('.nav-section').waypoint('sticky', {
			handler: function(dir) {
				if(dir === "down"){
					$(this).css({opacity:0});
					$(this).animate({opacity:1}, 500);
				}
			},
			offset: -250
		});

		$('#logo').waypoint(function(dir) {
				if(dir === "down"){
					$(".nav-section .nav-logo").css({visibility: 'visible', opacity:1});
				} else {
					$(".nav-section .nav-logo").css({visibility: 'hidden', opacity:0});
				}
		}, { offset: -65 });
			
		$("section").waypoint(function(direction) {
			var tis = $(this);
			
			if (direction === "up"){ tis = tis.prev(); }
			
			$("#nav a").removeClass("active");
			$('nav a[href="#' + tis.attr("id") + '"]').addClass("active");
		}, { offset: '50%' });
	},
	
	createMobileMenu: function(w) {
		"use strict";
		var $tis = this;
		
		if ( w !== null ){
			w = $(window).innerWidth();
		}
		
		if (w <= 751 && !$tis.mobMenuFlag) {
			var select = document.createElement('select');
			var first = document.createElement('option'),
                menuId = 0;

			first.innerHTML = 'Menu';
			first.setAttribute('selected', 'selected');
			select.setAttribute('id', 'mobile-nav');
			select.appendChild(first);

			var nav = document.getElementById('nav');
			var loadLinks = function(element, hyphen, level) {

				var e = element;
				var children = e.children;

				for(var i = 0; i < e.children.length; ++i) {

					var currentLink = children[i];

					switch(currentLink.nodeName) {
						case 'A':
							var option = document.createElement('option');
							option.innerHTML = (level++ < 1 ? '' : hyphen) + currentLink.innerHTML;
							option.value = $(currentLink).attr('href');
							if ($(currentLink).hasClass('open-overlay')){
								$(currentLink).attr("id", "menu-item-" + menuId);
								option.className = $(currentLink).attr('class');
								$(option).attr("data-id", "menu-item-" + menuId);
                                menuId++;
							}
							if ($(currentLink).attr('target') !== ""){
								$(option).attr("data-target", $(currentLink).attr('target'));
							}
							select.appendChild(option);
							break;
						default:
							if(currentLink.nodeName === 'UL') {
								if (level >= 2 ){
									hyphen += hyphen;
								}
							}
							loadLinks(currentLink, hyphen, level);
							break;
					}
				}
			};

			loadLinks(nav, '- ', 0);

			nav.appendChild(select);

			var mobileNavChange = function(opt) {
				var scroll = 0,
					navActive = opt.value;
				if ( navActive !== "#" ){
					if ( navActive.indexOf("#") === -1 && navActive !== "Menu"){
						if ($(opt).data("target") === "_blank"){
							window.open(navActive, '_blank');
						} else {
							location.href = navActive;
						}
					} else {				
						if (navActive !== "#home" && navActive !== "Menu"){
							scroll = $(navActive).offset().top -65;
						}
						
						$('html, body').stop().animate({
							scrollTop: scroll
						}, 1500,'easeInOutExpo');
					}
				} else {
					$("#" + $(opt).data("id")).trigger('click');
				}
			};
			
			var mobileNav = document.getElementById('mobile-nav');

			if(mobileNav.addEventListener) {
				mobileNav.addEventListener('change', function () {
					mobileNavChange(mobileNav.options[mobileNav.selectedIndex]);
				});
			} else if(mobileNav.attachEvent) {
				mobileNav.attachEvent('onchange', function () {
					mobileNavChange(mobileNav.options[mobileNav.selectedIndex]);
				});
			} else {
				mobileNav.onchange = function () {
					mobileNavChange(mobileNav.options[mobileNav.selectedIndex]);
				};
			}
			
			$tis.mobMenuFlag = true;
		}
	},
	
	socialStream: function() {
		"use strict";
		var $tis = this;
		
		var initialItems = 6,
			items = $('#social-stream-items li'),
			numItems = items.length,
			numPages = Math.ceil(numItems/initialItems);
		
		//Create navigation bullets
		var nav = document.createElement('ol');
			
		nav.setAttribute('id', 'social-stream-nav');
		
		for(var i=0; i<numPages; i++){
			var elem = document.createElement('li');
			elem.setAttribute('data-filter', 'page'+(i+1) );
			nav.appendChild(elem);
		}
		
		$('#social-stream').after(nav);
		
		
		//Add data-filter-class to each social stream item
		var page = 1;
		items.each(function(i){
			if ( i+1 > page * initialItems){
				page++;
			}
			
			this.setAttribute('data-filter-class', '["page' + page + '"]');
		});
		
		
		//Items show animation
		var itemsAnim = function(activeFilter){
				$('#social-stream').addClass('hideShadow');
				
				items.filter(function() { 
					return $(this).data('filter-class').toString() === activeFilter.toString();
				}).each(function(i){
					var $this = $(this);
					if ( i<initialItems ){					
						setTimeout(function() {
							$this.addClass("enabled");
						}, 200*i);
					}
				});
				
				setTimeout(function() {
					$('#social-stream').removeClass('hideShadow');
				}, 200*(initialItems-1));
			};
		
	
		// Prepare layout options.
		$tis.wookOptions = {
			autoResize: true, // This will auto-update the layout when the browser window is resized.
			container: $('#social-stream'), // Optional, used for some extra CSS styling
			offset: 1, // Optional, the distance between grid items
			itemWidth: 350 // Optional, the width of a grid item
		};

		// Get a reference to your grid items.
		$tis.wookHandler = $('#social-stream-items li');
		var filters = $('#social-stream-nav li');

		// Call the layout function.
		$tis.wookHandler.wookmark($tis.wookOptions);

		/**
		 * When a filter is clicked, toggle it's active state and refresh.
		 */
		var itemFilter;
		var onClickFilter = function(event) {
			var item = $(event.currentTarget),
				activeFilters = [];
			
			itemFilter = item.data('filter');
			
			if (!item.hasClass('active')) {
				filters.removeClass('active');
			} else {
				return false;
			}
			item.toggleClass('active');

			// Filter by the currently selected filter
			if (item.hasClass('active')) {
				
				items.filter(function() { 
					return $(this).data('filter-class').toString() !== itemFilter.toString();
				}).removeClass("enabled");
				
				activeFilters.push(itemFilter);
			}

			$tis.wookHandler.wookmarkInstance.filter(activeFilters);
			itemsAnim(itemFilter);
			$.waypoints('refresh');
		};

		// Capture filter click events.
		filters.click(onClickFilter);
	
		$("#social-stream-nav li").eq(0).click();
	},
	
	createMp3Player: function() {
		"use strict";
		
		$(document).ready(function(){
			$('#music-player').ttwMusicPlayer(myPlaylist, {
				autoPlay:true,
				currencySymbol:'',
				buyText:'',
				tracksToShow:1000,
				/*ratingCallback:function(index, playlistItem, rating){
					//some logic to process the rating, perhaps through an ajax call
				},*/
				jPlayer:{
					swfPath:'js/jplayer'
				}
			});
		});
	},
	
	googleMap: function() {
		"use strict";
		
		if ( typeof myConcerts === 'undefined' || myConcerts.length === 0){
			return false;
		}
		
		var $tis = this;
		var monthTxt = [],
			color = "#3f9f97",
			hidePastEvents = false; //If true, the events that took place won't show on the list of concerts
									//and its marker on the map won't be created
		
		monthTxt[0]="January";
		monthTxt[1]="February";
		monthTxt[2]="March";
		monthTxt[3]="April";
		monthTxt[4]="May";
		monthTxt[5]="June";
		monthTxt[6]="July";
		monthTxt[7]="August";
		monthTxt[8]="September";
		monthTxt[9]="October";
		monthTxt[10]="November";
		monthTxt[11]="December";
		
		var styles = [
			{
				stylers: [
					{hue: color},
					{saturation: -50},
					{lightness: -5}
				]
			},
			{
				featureType: "administrative",
				elementType: "labels.text.fill",
				stylers: [
					{saturation: 20},
					{lightness: -70}
				]
			},
			{
				featureType: "water",
				elementType: "geometry",
				stylers: [
					{lightness: 40}
				]
			},
			{
				featureType: "road",
				elementType: "geometry",
				stylers: [
					{hue: color},
					{saturation: -100},
					{lightness: 0}
				]
			},
			{
				featureType: "road.highway",
				elementType: "geometry",
				stylers: [
					{hue: color},
					{saturation: 5},
					{lightness: 5}
				]
			},
			{
				featureType: "road",
				elementType: "geometry.stroke",
				stylers: [
					{saturation: 10},
					{lightness: 0}
				]
			},
			{
				featureType: "road.highway",
				elementType: "geometry.stroke",
				stylers: [
					{saturation: 0},
					{lightness: 20}
				]
			},
			{
				featureType: "transit",
				elementType: "geometry",
				stylers: [
					{hue: color},
					{saturation: 30},
					{lightness: -30}
				]
			}
		];
		
		var styledMap = new google.maps.StyledMapType(styles, {name: "Beat"});
		
		var dates = {
			convert:function(d) {
				return (
					d.constructor === Date ? d :
					d.constructor === Array ? new Date(d[0],d[1],d[2]) :
					d.constructor === Number ? new Date(d) :
					d.constructor === String ? new Date(d) :
					typeof d === "object" ? new Date(d.year,d.month-1,d.day,d.hour,d.minute) :
					NaN
				);
			},
			compare:function(a,b) {
				return (
					isFinite(a=this.convert(a).valueOf()) &&
					isFinite(b=this.convert(b).valueOf()) ?
					(a>b)-(a<b) :
					NaN
				);
			}
		}
			
		for(var i=0; i < myConcerts.length; i++){
			myConcerts[i].date = new Date(myConcerts[i].year, myConcerts[i].month, myConcerts[i].day, myConcerts[i].hour, myConcerts[i].minute, 0);
		}
		
		function sortAsc(a, b) {
			return new Date(a.date).getTime() - new Date(b.date).getTime();
		}
		
		myConcerts.sort(sortAsc);
		
		var upcomingConcert = myConcerts[0];
		
		var currentdate = new Date();

		for(i = 0; i < myConcerts.length; i++){
			var concert = myConcerts[i];
			
			if(dates.compare(concert,currentdate) == -1 && hidePastEvents){
				delete myConcerts[i];
			}
			
			if (dates.compare(concert,currentdate) == 1 ){
				upcomingConcert = myConcerts[i];
				break;
			}
		}
		
		$(".ccounter").ccountdown(upcomingConcert.year,upcomingConcert.month,upcomingConcert.day,upcomingConcert.hour,upcomingConcert.minute);
		$("#concerts-info .date").html(upcomingConcert.day + " " + monthTxt[upcomingConcert.month - 1] + ", " + upcomingConcert.year);
		$("#concerts-info .location").html(upcomingConcert.location);
		if ( typeof upcomingConcert.buyTicketURL !== 'undefined' && upcomingConcert.buyTicketURL != "" ){
			$("#concerts-info #buyTicketsBtn").attr('href', upcomingConcert.buyTicketURL);
			$("#concerts-info #buyTicketsBtn").show();
		} else {
			$("#concerts-info #buyTicketsBtn").hide();
		}
		
		$tis.myLatlng = new google.maps.LatLng(upcomingConcert.latitude, upcomingConcert.longitude-0.01);
		
		var mapOptions = {
			center:  $tis.myLatlng,
			zoom: 6,
			scrollwheel: false,
			panControl:false,
			mapTypeControl:false,
			zoomControl:true,
			zoomControlOptions: {
				position:google.maps.ControlPosition.RIGHT_CENTER
			}
		};
		
		$tis.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
		$tis.map.mapTypes.set('map_style', styledMap);
		$tis.map.setMapTypeId('map_style');
		
		var createMarker = function(obj){
			var lat = obj.latitude, 
				lng = obj.longitude,
				year = obj.year,
				month = monthTxt[obj.month - 1].slice(0,3),
				day = obj.day,
				//location = obj.location,
				info = obj.infoWindow;
			
			var infowindow = new google.maps.InfoWindow({
				content: '<div class="infoWindow">' + info + '</div>'
			});
			
			var marker = new RichMarker({
				position: new google.maps.LatLng(lat, lng),
				map: $tis.map,
				anchorPoint: new google.maps.Point(29,-68),
				shadow: 'none',
				content: '<div class="marker"><div class="day">' + day +' </div>' +
						'<div class="month">' + month +' </div>' +
						'<div class="year">' + year +' </div>' +
						'</div>'
			});

			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open($tis.map,marker);
			});
		};
		
		for(i=myConcerts.length-1; i >= 0; i--){
			if ( myConcerts[i] == undefined ){
				continue;
			}
			
			var concert = myConcerts[i];
			createMarker(concert);
			$('#complete-list #list').prepend('<div class="completeInfo" data-id="' + i + '"><div class="completeDate">' + concert.day + " " + monthTxt[concert.month - 1] + ", " + concert.year + '</div><div class="completeLocation">' + concert.location + '</div></div>');
		}
	},
	
	startFlexSlider:function() {
		"use strict";
		
		$('.flexslider').flexslider({
			animation: "slide",
			maxItems: 1,
			prevText: "",
			nextText: "",
			controlNav: false,
			before: function(slider) {
						slider.slides.eq(slider.currentSlide).animate({opacity:0},200);
						slider.slides.eq(slider.animatingTo).css({opacity:0}).animate({opacity:1},800);
					}
		});
	},
	
	startNiceScroll:function() {
		"use strict";
		
		$(document).ready(function(){
			$("html").niceScroll({
				styler:"fb",
				autohidemode:true,
				cursorcolor:"#c2c2c2",
				cursoropacitymax:"0.7",
				cursorborder:"0px solid #000",
				horizrailenabled:false,
				zindex:"1001"
			});
			
			if (!$.browser.mobile) {
				$("#music-player .tracklist").niceScroll({
					cursorcolor:"#c2c2c2", 
					cursoropacitymax:"0.7",
					cursorborder:"0px solid #000",
					railpadding:{top:0,right:3,left:0,bottom:0}
				});
			}
			
			$("#complete-list").niceScroll({
				cursorcolor:"#c2c2c2", 
				cursoropacitymax:"0.7",
				cursorborder:"0px solid #000",
				railpadding:{top:0,right:3,left:0,bottom:0},
				zindex:"999"
			});
			
			$(".gallery-scroller").niceScroll({
				cursorcolor:'#3f9f97', 
				cursorwidth:'20px',
				background:'#1F2326',
				cursorborder:'0px solid #1F2326',
				zindex:'999',
				autohidemode:false,
				enablemousewheel:false
			});
		});
		
		$("#music-player").one("mouseenter mouseleave", function(){
			$("#music-player .tracklist").getNiceScroll().resize();
		});
		
		$("#complete-list").on("mouseenter mouseleave", function(){
			$("#complete-list").getNiceScroll().resize();
		});
	},
	
	windowResize:function() {
		"use strict";
		
		var $tis = this;
		
		$(window).resize(function() {
			var w = $(window).innerWidth();
			
			$tis.resizeLogo(w);
			$tis.createMobileMenu(w);
		});
	},
	
	resizeLogo:function(w) {
		"use strict";
		
		if ( w !== null ){
			w = $(window).innerWidth();
		}
		
		$("#logo").css({maxWidth: w + 'px'});
	},
	
	overlayButtons:function() {
		"use strict";
		var $tis = this;
		
		$(".open-overlay").click(function(e){
			e.preventDefault();
			
			var newsDetails = $(this).parent().data('news-details');
			if ( newsDetails !== undefined ){
				$tis.populateNews(newsDetails);
			}
			
			var page = $("#" + $(this).data('overlay-id'));
			
			$tis.scrollPos = $(window).scrollTop();
			
			var transEndEventNames = {
					'WebkitTransition' : 'webkitTransitionEnd',
					'OTransition' : 'oTransitionEnd',
					'msTransition' : 'MSTransitionEnd',
					'transition' : 'transitionend'
				},
				// animation end event name
				transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ];
				
			if ( transEndEventName === undefined){
				page.addClass('moveFromBottom');
				
				$("#header, section, #footer").hide();
				$("#music-player .tracklist").getNiceScroll().hide();
					
				$('html, body').animate({scrollTop: 0}, 0);
				page.css({position:'absolute'});
			
			} else {
				page.addClass('moveFromBottom').one( transEndEventName, function() {
					$("#header, section, #footer, .nicescroll-rails").hide();
					$(".nicescroll-rails:first").show();
					$("#music-player .tracklist").getNiceScroll().hide();
					
					$('html, body').animate({scrollTop: 0}, 0);
					$(this).css({position:'absolute'});
				});
			}
			
			page.on("mouseenter mouseleave", function(){
				$("html").getNiceScroll().resize();
			});
			
		});
		
		$(".close-overlay").click(function(){
			var page = $('.page-overlay');
			
			page.css({position:'fixed'});
			
			$("#header, section, #footer, .nicescroll-rails").show();
			$("#music-player .tracklist").getNiceScroll().show();
			
			$('html, body').animate({scrollTop: $tis.scrollPos}, 0);
			
			page.removeClass('moveFromBottom');
		});
	},
	
	populateNews: function(newsDetails){
		"use strict";
		var $tis = this;
		
		$('#news-img-wrap .date').html(newsDetails[0].date);
		$('#news-img-wrap .title h3').html(newsDetails[0].title);
		$('#news-img-wrap img').remove();
		$('#news-img-wrap').append('<img src="' + newsDetails[0].img + '" alt="" />');				
		
		$('#news-txt').html("");
	
		if (!newsDetails[0].txt){
			return false;
		}
		
		var aux;
		for(var i=0; i < newsDetails[0].txt.length; i++){
			aux = newsDetails[0].txt[i];
			
			for(var key in aux) {
				if (aux.hasOwnProperty(key)) {
					var value = aux[key];
					
					if ( value !== undefined ){
						switch (key) {
							case 'title':
								$('#news-txt').append('<h3>' + value + '</h3>');
								break;
								 
							case 'txt':
								$('#news-txt').append('<p>' + value + '</p>');
								break;
								 
							case 'img':
								if(aux.hasOwnProperty('quote')){
									$('#news-txt').append('<img src="' + value + '" alt="" class="right col-sm-6" />');
								} else {
									$('#news-txt').append('<img src="' + value + '" alt="" width="100%" />');
								}
								break;
								 
							case 'quote':
								if(aux.hasOwnProperty('img')){
									$('#news-txt').append('<span class="quote half">' + value + '</span>');
								} else {
									$('#news-txt').append('<span class="quote">' + value + '</span>');
								}
								break;
								 
							case 'vimeo':
								$('#news-txt').append('<div class="center clearfix videoEmbed" style="width:100%;"><iframe src="' + value + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>');
								break;
								 
							case 'youtube':
								$('#news-txt').append('<div class="center clearfix videoEmbed" style="width:100%;"><iframe src="' + value + '?wmode=opaque" frameborder="0" allowfullscreen></iframe></div>');
								break;
						}
					}
				}
			}
		}
		$tis.resizeVideos();
		$(".page-overlay .loading, .page-overlay .progress").delay(1000).hide(100);
	},
	
	resizeVideos: function(){
		"use strict";
		
		var $allVideos = $("iframe[src^='http://player.vimeo.com'], iframe[src^='http://www.youtube.com'], object, embed"),
			$fluidEl = $(".videoEmbed");
		
		$allVideos.each(function() {
			var $el = $(this);
			$el.attr('data-aspectRatio', $el.height() / $el.width()).removeAttr('height').removeAttr('width');
		});
		
		$(window).resize(function() {
			var newWidth = $fluidEl.width();
			
			$allVideos.each(function() {
				var $el = $(this);
				$el.width(newWidth).height(newWidth * $el.attr('data-aspectRatio'));
			});
		}).resize();
	},
	
	isMobile: function(){
		"use strict";
		
		(function(){(jQuery.browser=jQuery.browser||{}).mobile=(/android|webos|iphone|ipad|ipod|blackberry/i.test(navigator.userAgent.toLowerCase()));})(navigator.userAgent||navigator.vendor||window.opera);
	},
	
	contactForm: function() {
		"use strict";
		var $tis = this;
		
		$("#contact_send").click(function(e){
			e.preventDefault();

			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				name = $('#contact_name').val(),
				email = $('#contact_email').val(),
				subject = $('#contact_subject').val(),
				message = $('#contact_message').val(),
				html = "",
				error = false;
			
			if(name === ""){
				$('#contact_name').addClass('invalid');
				error = true;
			}else{
				$('#contact_name').removeClass('invalid');
				html = "name=" + name;
			}

			if(email === ""){
				$('#contact_email').addClass('invalid');
				error = true;
			}else if(re.test(email) === false){
				$('#contact_email').addClass('invalid');
				error = true;
			}else{
				$('#contact_email').removeClass('invalid');
				html += "&email="+ email;
			}
			
			if(subject === ""){
				$('#contact_subject').addClass('invalid');
				error = true;
			}else{
				$('#contact_subject').removeClass('invalid');
				html += "&subject=" + subject;
			}
			
			if(message === ""){
				$('#contact_message').addClass('invalid');
				error = true;
			}else{
				$('#contact_message').removeClass('invalid');
				html += "&message="+ message;
			}
			
			var showError = function(){
				var iClass = $('#contact_send i').attr("class");
				
				$('#contact_send i').removeClass(iClass).addClass('icon-remove').delay(1500).queue(function(next){
					$(this).removeClass('icon-remove').addClass(iClass);
					next();
				});
				$('#contact_send').addClass('btn-danger').delay(1500).queue(function(next){
					$(this).removeClass('btn-danger');
					next();
				});
			};
			
			if(!error && !$tis.sendingMail) {
				$tis.sendingMail = true;
				$('#contact_send i').addClass('icon-cog icon-spin');
				$('#contact_send').addClass('disabled');

				$.ajax({
					type: 'POST',
					url: 'contact.php',
					data: html,
					success: function(msg){
						$('#contact_send i').removeClass('icon-cog icon-spin');
						$('#contact_send').removeClass('disabled');
						
						if (msg === 'ok'){
							var iClass = $('#contact_send i').attr("class");
				
							$('#contact_send i').removeClass(iClass).addClass('icon-ok').delay(1500).queue(function(next){
								$(this).removeClass('icon-ok').addClass(iClass);
								next();
							});
							$('#contact_send').addClass('btn-success').delay(1500).queue(function(next){
								$(this).removeClass('btn-success');
								next();
							});
							$('#form-contact')[0].reset();
						}else{
							showError();
						}
						
						$tis.sendingMail = false;
					},
					error: function(){
						$('#contact_send i').removeClass('icon-cog icon-spin');
						$('#contact_send').removeClass('disabled');
						
						showError();
						$tis.sendingMail = false;
					}
				});
			} else{
				showError();
			}
			
			
			
			return false;
		});
	},
	
	buttons: function(){
		"use strict";
		var $tis = this;
		
		// Capture 'See Location' Button click event.
		$("#seeLocation").click(function(e){
			e.preventDefault();
			
			$tis.map.setCenter($tis.myLatlng);
			$tis.map.setZoom(11);
		});
		
		// Capture 'Complete List' Button click event.
		$("#complete-list-btn").click(function(){
			$('#complete-list').animate({opacity:1, height:'350px'}, 300).addClass('enabled');
			$('#counter-info, .buttons-area').toggleClass('disabled');
		});
		
		// Capture 'Close Complete List' click event.
		$(".close-complete-list").click(function(){
			$('#complete-list').animate({opacity:0, height:'0px'}, 300, function(){
				$(this).removeClass('enabled');
			});
			$('#counter-info, .buttons-area').toggleClass('disabled');
		});
		
		// Capture 'Complete List' Item click event.
		$(".completeInfo").click(function(){
			var id = parseInt($(this).data('id'), null);
		
			$tis.map.setCenter(new google.maps.LatLng(myConcerts[id].latitude, myConcerts[id].longitude-0.01));
			$tis.map.setZoom(11);
		});

		// Capture Other News 'Load More' Button click event.
		$("#load-more-btn").click(function(){
			$('#other-news li.disabled').css({display:'inline-block'});
			setTimeout(function() {
				$('#other-news li').removeClass("disabled");
			}, 200);
			$(this).hide(300);
		});
		
		// Capture Other News 'Load More' Button click event.
		$("#other-news li").click(function(){
			$(".page-overlay .progress").css({top: $(window).scrollTop() + $(window).height()/2 + 'px'});
			$(".page-overlay .loading, .page-overlay .progress").show(100);
			var newsDetails = $(this).data('news-details');
			if ( newsDetails !== undefined ){
				$tis.populateNews(newsDetails);
			}
		});
	}
};

Beat.init();