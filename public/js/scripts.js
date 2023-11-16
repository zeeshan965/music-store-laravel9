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

    init: function () {
        "use strict";

        var $tis = this;

        if ($tis.initialized) {
            return;
        }

        $tis.initialized = true;
        $tis.construct();
        $tis.events();
    },

    construct: function () {
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
         * Activate placeholder in older browsers
         */
        $('input, textarea').placeholder();

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
        //$("a[data-gal^='prettyPhoto']").prettyPhoto({theme: 'beat', hook: 'data-gal'});

    },

    events: function () {
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

    navigation: function () {
        "use strict";

        $('#nav li a, .nav-logo').bind('click', function (event) {
            var navActive = $(this);
            var scroll = 0,
                navAnchor = $(this).attr('href');

            if (window.location.pathname == "/" && navAnchor.includes("#")) {
                if (($(navAnchor).offset() != undefined)) {
                    scroll = $(navActive.attr('href')).offset().top - 65;
                } else if ($(navAnchor).offset() == undefined) {
                    navActive.blur();
                    return false;
                }

                $('html, body').stop().animate({
                    scrollTop: scroll
                }, 1500, 'easeInOutExpo', function () {
                    navActive.blur();
                });
                event.preventDefault();
            }
        });

        $('.nav-section').waypoint('sticky', {
            handler: function (dir) {
                if (dir === "down") {
                    $(this).css({opacity: 0});
                    $(this).animate({opacity: 1}, 500);
                }
            },
            offset: -250
        });

        $('#logo').waypoint(function (dir) {
            if (dir === "down") {
                //$(".nav-section .nav-logo").css({visibility: 'visible', opacity: 1});
            } else {
                // $(".nav-section .nav-logo").css({visibility: 'hidden', opacity: 0});
            }
        }, {offset: -65});

        $("section").waypoint(function (direction) {
            var tis = $(this);

            if (direction === "up") {
                tis = tis.prev();
            }

            $("#nav a").removeClass("active");
            $('nav a[href="#' + tis.attr("id") + '"]').addClass("active");
        }, {offset: '50%'});
    },

    createMobileMenu: function (w) {
        "use strict";
        var $tis = this;

        if (w !== null) {
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
            var loadLinks = function (element, hyphen, level) {

                var e = element;
                var children = e.children;

                for (var i = 0; i < e.children.length; ++i) {

                    var currentLink = children[i];

                    switch (currentLink.nodeName) {
                        case 'A':
                            var option = document.createElement('option');
                            option.innerHTML = (level++ < 1 ? '' : hyphen) + currentLink.innerHTML;
                            option.value = $(currentLink).attr('href');
                            if ($(currentLink).hasClass('open-overlay')) {
                                $(currentLink).attr("id", "menu-item-" + menuId);
                                option.className = $(currentLink).attr('class');
                                $(option).attr("data-id", "menu-item-" + menuId);
                                menuId++;
                            }
                            if ($(currentLink).attr('target') !== "") {
                                $(option).attr("data-target", $(currentLink).attr('target'));
                            }
                            select.appendChild(option);
                            break;
                        default:
                            if (currentLink.nodeName === 'UL') {
                                if (level >= 2) {
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

            var mobileNavChange = function (opt) {
                var scroll = 0,
                    navActive = opt.value;
                if (navActive !== "#") {
                    if (navActive.indexOf("#") === -1 && navActive !== "Menu") {
                        if ($(opt).data("target") === "_blank") {
                            window.open(navActive, '_blank');
                        } else {
                            location.href = navActive;
                        }
                    } else {
                        if (navActive !== "#home" && navActive !== "Menu") {
                            scroll = $(navActive).offset().top - 65;
                        }

                        $('html, body').stop().animate({
                            scrollTop: scroll
                        }, 1500, 'easeInOutExpo');
                    }
                } else {
                    $("#" + $(opt).data("id")).trigger('click');
                }
            };

            var mobileNav = document.getElementById('mobile-nav');

            if (mobileNav.addEventListener) {
                mobileNav.addEventListener('change', function () {
                    mobileNavChange(mobileNav.options[mobileNav.selectedIndex]);
                });
            } else if (mobileNav.attachEvent) {
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

    startFlexSlider: function () {
        "use strict";

        $('.flexslider').flexslider({
            animation: "slide",
            maxItems: 1,
            prevText: "",
            nextText: "",
            controlNav: false,
            before: function (slider) {
                slider.slides.eq(slider.currentSlide).animate({opacity: 0}, 200);
                slider.slides.eq(slider.animatingTo).css({opacity: 0}).animate({opacity: 1}, 800);
            }
        });
    },

    startNiceScroll: function () {
        "use strict";

        $(document).ready(function () {
            $("html").niceScroll({
                styler: "fb",
                autohidemode: true,
                cursorcolor: "#c2c2c2",
                cursoropacitymax: "0.7",
                cursorborder: "0px solid #000",
                horizrailenabled: false,
                zindex: "1001"
            });

            if (!$.browser.mobile) {
                $("#music-player .tracklist").niceScroll({
                    cursorcolor: "#c2c2c2",
                    cursoropacitymax: "0.7",
                    cursorborder: "0px solid #000",
                    railpadding: {top: 0, right: 3, left: 0, bottom: 0}
                });
            }

            $("#complete-list").niceScroll({
                cursorcolor: "#c2c2c2",
                cursoropacitymax: "0.7",
                cursorborder: "0px solid #000",
                railpadding: {top: 0, right: 3, left: 0, bottom: 0},
                zindex: "999"
            });

            $(".gallery-scroller").niceScroll({
                cursorcolor: '#3f9f97',
                cursorwidth: '10px',
                background: '#1F2326',
                cursorborder: '0px solid #1F2326',
                zindex: '999',
                autohidemode: false,
                enablemousewheel: false,
                railpadding: { top: 0, right: 0, left: 0, bottom: -7 }, // set padding for rail bar
            });
        });

        $("#music-player").one("mouseenter mouseleave", function () {
            $("#music-player .tracklist").getNiceScroll().resize();
        });

        $("#complete-list").on("mouseenter mouseleave", function () {
            $("#complete-list").getNiceScroll().resize();
        });
    },

    windowResize: function () {
        "use strict";

        var $tis = this;

        $(window).resize(function () {
            var w = $(window).innerWidth();

            $tis.resizeLogo(w);
            $tis.createMobileMenu(w);
        });
    },

    resizeLogo: function (w) {
        "use strict";

        if (w !== null) {
            w = $(window).innerWidth();
        }

        $("#logo").css({maxWidth: w + 'px'});
    },

    overlayButtons: function () {
        "use strict";
        var $tis = this;

        $(".open-overlay").click(function (e) {
            e.preventDefault();

            var newsDetails = $(this).parent().data('news-details');
            if (newsDetails !== undefined) {
                $tis.populateNews(newsDetails);
            }

            var page = $("#" + $(this).data('overlay-id'));

            $tis.scrollPos = $(window).scrollTop();

            var transEndEventNames = {
                    'WebkitTransition': 'webkitTransitionEnd',
                    'OTransition': 'oTransitionEnd',
                    'msTransition': 'MSTransitionEnd',
                    'transition': 'transitionend'
                },
                // animation end event name
                transEndEventName = transEndEventNames[Modernizr.prefixed('transition')];

            if (transEndEventName === undefined) {
                page.addClass('moveFromBottom');

                $("#header, section, #footer").hide();
                $("#music-player .tracklist").getNiceScroll().hide();

                $('html, body').animate({scrollTop: 0}, 0);
                page.css({position: 'absolute'});

            } else {
                page.addClass('moveFromBottom').one(transEndEventName, function () {
                    $("#header, section, #footer, .nicescroll-rails").hide();
                    $(".nicescroll-rails:first").show();
                    $("#music-player .tracklist").getNiceScroll().hide();

                    $('html, body').animate({scrollTop: 0}, 0);
                    $(this).css({position: 'absolute'});
                });
            }

            page.on("mouseenter mouseleave", function () {
                $("html").getNiceScroll().resize();
            });

        });

        $(".close-overlay").click(function () {
            var page = $('.page-overlay');

            page.css({position: 'fixed'});

            $("#header, section, #footer, .nicescroll-rails").show();
            $("#music-player .tracklist").getNiceScroll().show();

            $('html, body').animate({scrollTop: $tis.scrollPos}, 0);

            page.removeClass('moveFromBottom');
        });
    },

    populateNews: function (newsDetails) {
        "use strict";
        var $tis = this;

        $('#news-img-wrap .date').html(newsDetails[0].date);
        $('#news-img-wrap .title h3').html(newsDetails[0].title);
        $('#news-img-wrap img').remove();
        $('#news-img-wrap').append('<img src="' + newsDetails[0].img + '" alt="" />');

        $('#news-txt').html("");

        if (!newsDetails[0].txt) {
            return false;
        }

        var aux;
        for (var i = 0; i < newsDetails[0].txt.length; i++) {
            aux = newsDetails[0].txt[i];

            for (var key in aux) {
                if (aux.hasOwnProperty(key)) {
                    var value = aux[key];

                    if (value !== undefined) {
                        switch (key) {
                            case 'title':
                                $('#news-txt').append('<h3>' + value + '</h3>');
                                break;

                            case 'txt':
                                $('#news-txt').append('<p>' + value + '</p>');
                                break;

                            case 'img':
                                if (aux.hasOwnProperty('quote')) {
                                    $('#news-txt').append('<img src="' + value + '" alt="" class="right col-sm-6" />');
                                } else {
                                    $('#news-txt').append('<img src="' + value + '" alt="" width="100%" />');
                                }
                                break;

                            case 'quote':
                                if (aux.hasOwnProperty('img')) {
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

    resizeVideos: function () {
        "use strict";

        var $allVideos = $("iframe[src^='http://player.vimeo.com'], iframe[src^='http://www.youtube.com'], object, embed"),
            $fluidEl = $(".videoEmbed");

        $allVideos.each(function () {
            var $el = $(this);
            $el.attr('data-aspectRatio', $el.height() / $el.width()).removeAttr('height').removeAttr('width');
        });

        $(window).resize(function () {
            var newWidth = $fluidEl.width();

            $allVideos.each(function () {
                var $el = $(this);
                $el.width(newWidth).height(newWidth * $el.attr('data-aspectRatio'));
            });
        }).resize();
    },

    isMobile: function () {
        "use strict";

        (function () {
            (jQuery.browser = jQuery.browser || {}).mobile = (/android|webos|iphone|ipad|ipod|blackberry/i.test(navigator.userAgent.toLowerCase()));
        })(navigator.userAgent || navigator.vendor || window.opera);
    },

    contactForm: function () {
        "use strict";
        var $tis = this;

        $("#contact_send").click(function (e) {
            e.preventDefault();

            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                name = $('#contact_name').val(),
                email = $('#contact_email').val(),
                subject = $('#contact_subject').val(),
                message = $('#contact_message').val(),
                html = "",
                error = false;

            if (name === "") {
                $('#contact_name').addClass('invalid');
                error = true;
            } else {
                $('#contact_name').removeClass('invalid');
                html = "name=" + name;
            }

            if (email === "") {
                $('#contact_email').addClass('invalid');
                error = true;
            } else if (re.test(email) === false) {
                $('#contact_email').addClass('invalid');
                error = true;
            } else {
                $('#contact_email').removeClass('invalid');
                html += "&email=" + email;
            }

            if (subject === "") {
                $('#contact_subject').addClass('invalid');
                error = true;
            } else {
                $('#contact_subject').removeClass('invalid');
                html += "&subject=" + subject;
            }

            if (message === "") {
                $('#contact_message').addClass('invalid');
                error = true;
            } else {
                $('#contact_message').removeClass('invalid');
                html += "&message=" + message;
            }

            var showError = function () {
                var iClass = $('#contact_send i').attr("class");

                $('#contact_send i').removeClass(iClass).addClass('fa fa-times').delay(1500).queue(function (next) {
                    $(this).removeClass('fa fa-times').addClass(iClass);
                    next();
                });
                $('#contact_send').addClass('btn-danger').delay(1500).queue(function (next) {
                    $(this).removeClass('btn-danger');
                    next();
                });
            };

            if (!error && !$tis.sendingMail) {
                $tis.sendingMail = true;
                $('#contact_send i').addClass('fa fa-cog fa fa-spinner');
                $('#contact_send').addClass('disabled');

                $.ajax({
                    type: 'POST',
                    url: 'contact.php',
                    data: html,
                    success: function (msg) {
                        $('#contact_send i').removeClass('fa fa-cog fa fa-spinner');
                        $('#contact_send').removeClass('disabled');

                        if (msg === 'ok') {
                            var iClass = $('#contact_send i').attr("class");

                            $('#contact_send i').removeClass(iClass).addClass('fa fa-check').delay(1500).queue(function (next) {
                                $(this).removeClass('fa fa-check').addClass(iClass);
                                next();
                            });
                            $('#contact_send').addClass('btn-success').delay(1500).queue(function (next) {
                                $(this).removeClass('btn-success');
                                next();
                            });
                            $('#form-contact')[0].reset();
                        } else {
                            showError();
                        }

                        $tis.sendingMail = false;
                    },
                    error: function () {
                        $('#contact_send i').removeClass('fa fa-cog fa fa-spinner');
                        $('#contact_send').removeClass('disabled');

                        showError();
                        $tis.sendingMail = false;
                    }
                });
            } else {
                showError();
            }


            return false;
        });
    },

    buttons: function () {
        "use strict";
        var $tis = this;

        // Capture 'See Location' Button click event.
        $("#seeLocation").click(function (e) {
            e.preventDefault();

            $tis.map.setCenter($tis.myLatlng);
            $tis.map.setZoom(11);
        });

        // Capture 'Complete List' Button click event.
        $("#complete-list-btn").click(function () {
            $('#complete-list').animate({opacity: 1, height: '350px'}, 300).addClass('enabled');
            $('#counter-info, .buttons-area').toggleClass('disabled');
        });

        // Capture 'Close Complete List' click event.
        $(".close-complete-list").click(function () {
            $('#complete-list').animate({opacity: 0, height: '0px'}, 300, function () {
                $(this).removeClass('enabled');
            });
            $('#counter-info, .buttons-area').toggleClass('disabled');
        });

        // Capture 'Complete List' Item click event.
        $(".completeInfo").click(function () {
            var id = parseInt($(this).data('id'), null);

            $tis.map.setCenter(new google.maps.LatLng(myConcerts[id].latitude, myConcerts[id].longitude - 0.01));
            $tis.map.setZoom(11);
        });

        // Capture Other News 'Load More' Button click event.
        $("#load-more-btn").click(function () {
            $('#other-news li.disabled').css({display: 'inline-block'});
            setTimeout(function () {
                $('#other-news li').removeClass("disabled");
            }, 200);
            $(this).hide(300);
        });

        // Capture Other News 'Load More' Button click event.
        $("#other-news li").click(function () {
            $(".page-overlay .progress").css({top: $(window).scrollTop() + $(window).height() / 2 + 'px'});
            $(".page-overlay .loading, .page-overlay .progress").show(100);
            var newsDetails = $(this).data('news-details');
            if (newsDetails !== undefined) {
                $tis.populateNews(newsDetails);
            }
        });
    }
};

Beat.init();
