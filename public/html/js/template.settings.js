/*
* Author: Wisely Themes
* Author URI:
* Theme Name: Mochito
* Theme URI:
* Version: 1.0.0
*/

/* global less:true */

var templateSettings = {

    initialized: false,

    init: function() {
        "use strict";

        var $tis = this;

        if ($tis.initialized){
            return;
        }

        $tis.initialized = true;

        /**
         * Append minicolors CSS
         */
        $('head').append('<link href="css/jquery.minicolors.min.css" rel="stylesheet" type="text/css" />');

        /**
         * Get minicolors Script
         */
        $.getScript("js/jquery.minicolors.js", function() {
            $tis.construct();
            $tis.events();
        }).fail(function() {
            alert( "Failed to load Template Settings Panel!" );
        });
    },

    construct: function() {
        "use strict";

        var $tis = this;

        $('.minicolors').minicolors({
            theme: 'bootstrap',
            change: function(hex){
                $tis.configColor(hex);
            }
        });
    },

    events: function() {
        "use strict";

        var $tis = this;

        /**
         * Template Settings Panel Open/Close
         */
        var opened = false;
        $("#template-settings>i").click(function(){
            if (opened){
                $('#template-settings').animate({left: '-188px'}, 400, 'easeInExpo');
                opened = false;
            }else{
                $('#template-settings').animate({left: '0px'}, 400, 'easeOutExpo');
                opened = true;
            }
        });

        /**
         * Theme Style
         */
        $('select[name=theme]').change(function() {
            $tis.setTheme($(this).find('option:selected').val());
        });
    },

    configColor: function(clr) {
        "use strict";

        $('#custom_color').remove();
        $('head').append('<style type="text/css" id="custom_color" />');

        $('#custom_color').html(
            'h1, h2, .color, a, a:hover, a:focus, select, textarea, input[type="text"], input[type="password"], input[type="datetime"], input[type="datetime-local"], input[type="date"], input[type="month"], input[type="time"], input[type="week"], input[type="number"], input[type="email"], input[type="url"], input[type="search"], input[type="tel"], input[type="color"], .uneditable-input, .btn-dark, .btn-dark:focus, .btn-dark:hover, .btn-dark:active, .btn-dark.active, .open .dropdown-toggle.btn-dark, .btn-dark2:hover, .btn-dark2:active, .btn-dark2.active, .open .dropdown-toggle.btn-dark2, #nav ul > li > a:focus, #nav ul > li > a:hover, #nav ul > li > a.active, #mobile-nav, .sn-icons a:hover, .ttw-music-player .rating-star:hover, .ttw-music-player .rating-star.on, .ttw-music-player .rating-star.hover, .ttw-music-player .tracklist li:hover, .ttw-music-player .tracklist li.playing, .ttw-music-player .more:hover, #news-txt .quote span, #other-news li .other-news-img-wrap .date, #other-news li .other-news-details h4, .album .album-info ol, .ccounter .counter span, #complete-list .completeInfo:hover .completeDate, #complete-list .completeInfo:hover .completeLocation {color:' + clr + ';}'+
            '.btn-default, .btn-default:focus, .btn-default:hover, .btn-default:active, .btn-default.active, .open .dropdown-toggle.btn-default, #social-stream-items > li.featured .icon, #social-stream-items > li.featured > .title, #social-stream-nav li.active, #social-stream-nav li:hover, #news-img-wrap .date, #other-news li .date, #news-img-wrap .title, .band-elem h3, .album .album-img .album-img-wrap .title, #concerts-info .featured, #concerts-info .featured .icon, .gallery-scroller li span, .flex-direction-nav a, a.pp_next,a.pp_previous, div.beat .pp_details, #ascrail2003-hr div {background-color:' + clr + ' !important;}'+
            'textarea:focus, input[type="text"]:focus, input[type="password"]:focus, input[type="datetime"]:focus, input[type="datetime-local"]:focus, input[type="date"]:focus, input[type="month"]:focus, input[type="time"]:focus, input[type="week"]:focus, input[type="number"]:focus, input[type="email"]:focus, input[type="url"]:focus, input[type="search"]:focus, input[type="tel"]:focus, input[type="color"]:focus, .uneditable-input:focus, .btn-default, .btn-default:focus, .btn-default:hover, .btn-default:active, .btn-default.active, .open .dropdown-toggle.btn-default, #mobile-nav {border-color:' + clr + ';}'+
            '.nav-section, #social-stream-items > li.featured .icon:after, #news-img-wrap .date:after, #other-news li .date:after, .band-elem h3:after, .album .album-img .album-img-wrap .title:after, #concerts-info .featured .icon:after, #complete-list .completeInfo:hover {border-top-color:' + clr + ';}'+
            '.ccounter, #complete-list .completeInfo:hover, #footer {border-bottom-color:' + clr + ';}'+
            '.album .album-info {border-left-color:' + clr + ';}'
        );

        $(".ccounter").html(
            '<div class="counter">'+
            '<input class="knob days" data-readOnly="true" data-width="85" data-height="85" data-displayPrevious=true data-fgColor="' + clr + '" data-skin="beat" data-thickness=".15" data-min="0" data-max="365" value="75" />'+
            '<span>DAYS</span>'+
            '</div>'+
            '<div class="counter">'+
            '<input class="knob hour" data-readOnly="true" data-width="85" data-height="85" data-min="0" data-max="24" data-displayPrevious=true data-fgColor="' + clr + '" data-skin="beat" data-thickness=".15" value="75" />'+
            '<span>HOURS</span>'+
            '</div>'+
            '<div class="counter">'+
            '<input class="knob minute" data-readOnly="true" data-width="85" data-height="85" data-min="0" data-max="60" data-displayPrevious=true data-fgColor="' + clr + '" data-skin="beat" data-thickness=".15" value="75" />'+
            '<span>MIN.</span>'+
            '</div>'+
            '<div class="counter">'+
            '<input class="knob second" data-readOnly="true" data-width="85" data-height="85" data-min="0" data-max="60" data-displayPrevious=true data-fgColor="' + clr + '" data-skin="beat" data-thickness=".15" value="75" />'+
            '<span>SEC.</span>'+
            '</div>');
        //$(".ccounter").ccountdown(2014,10,25,22,30);
        $(".knob").knob({draw:function(){if(this.$.data("skin")=="beat"){var c=this.angle(this.cv),b=this.startAngle,d=this.startAngle,f,e=d+c,g=true;this.g.lineWidth=this.lineWidth;this.o.cursor&&(d=e-0.3)&&(e=e+0.3);if(this.o.displayPrevious){f=this.startAngle+this.angle(this.value);this.o.cursor&&(b=f+0.3)&&(f=f-0.3);this.g.beginPath();this.g.arc(this.xy,this.xy,this.radius-this.lineWidth,b,f,false);this.g.stroke();}this.g.beginPath();this.g.strokeStyle=g?this.o.fgColor:this.fgColor;this.g.arc(this.xy,this.xy,this.radius-this.lineWidth,d,e,false);this.g.stroke();this.g.lineWidth=2;this.g.beginPath();this.g.strokeStyle=this.o.fgColor;this.g.arc(this.xy,this.xy,this.radius-this.lineWidth-2+this.lineWidth*2/3,0,2*Math.PI,false);this.g.stroke();this.g.beginPath();this.g.strokeStyle=g?this.o.fgColor:this.fgColor;this.g.arc(this.xy,this.xy,this.radius-this.lineWidth,d,e,false);this.g.stroke();this.g.lineWidth=2;this.g.beginPath();this.g.strokeStyle=this.o.fgColor;this.g.arc(this.xy,this.xy,this.radius-this.lineWidth+2-this.lineWidth*2/3,0,2*Math.PI,false);this.g.stroke();return false;}}});
    },

    setTheme: function(val){
        "use strict";

        if(val === 'lightversion'){
            $('head').append('<link href="css/lightversion.css" rel="stylesheet" type="text/css" id="lightversion" />');
        }
        else {
            $('#lightversion').remove();
        }
    }
};

templateSettings.init();