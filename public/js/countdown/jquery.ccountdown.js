/*!jQuery Circular CountDown*/
/**
 * Downward compatible
 *
 * Version: 1.0.0 (26/04/2013)
 * Requires: jQuery v1.7+
 *
 * Copyright (c) 2013 Nikhil Navadiya
 *
 * Thanks to http://www.javascriptkit.com/
 */
(function($){
	$.fn.ccountdown = function(_yr,_m,_d,_hr,_min){
		if ( _hr === undefined ){
			_hr = 0;
		}
		if ( _min === undefined ){
			_min = 0;
		}
		var _montharray=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec")
		_changeTime(); // calling function first time so that it wll setup remaining time
		function _changeTime() {
			var _today=new Date();
			var _todayy=_today.getYear();
			if (_todayy < 1000)
			_todayy+=1900;
			var _todaym=_today.getMonth();
			var _todayd=_today.getDate();
			var _todayh=_today.getHours();
			var _todaymin=_today.getMinutes();
			var _todaysec=_today.getSeconds();
			var _todaystring=_montharray[_todaym]+" "+_todayd+", "+_todayy+" "+_todayh+":"+_todaymin+":"+_todaysec;
			_futurestring=_montharray[_m-1]+" "+_d+", "+_yr+" "+_hr+":"+_min+":00";
			/* calculation of remaining days, hrs, min, and secs */
			_dd=Date.parse(_futurestring)-Date.parse(_todaystring);
			_dday=Math.floor(_dd/(60*60*1000*24)*1);
			_dhour=Math.floor((_dd%(60*60*1000*24))/(60*60*1000)*1);
			_dmin=Math.floor(((_dd%(60*60*1000*24))%(60*60*1000))/(60*1000)*1);
			_dsec=Math.floor((((_dd%(60*60*1000*24))%(60*60*1000))%(60*1000))/1000*1);
			var $ss = $(".second"), $mm = $(".minute"),$hh = $(".hour"),$dd = $(".days");
			$ss.val(_dsec).trigger("change");
			$mm.val(_dmin).trigger("change");
			$hh.val(_dhour).trigger("change");
			$dd.val(_dday).trigger("change");
		}
		setInterval(_changeTime ,1000);
	};
})(jQuery);
