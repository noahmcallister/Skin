/*
* @package Bayfront Skin
* @version 1.0
*
* @author John Robinson <john@bayfrontmedia.com>
* @copyright Copyright (c) 2018 Bayfront Media
* @link https://github.com/bayfrontmedia/skin
*
*/

// -------------------- Selector Caching --------------------
/*
function Selector_Cache() {
	
	var collection = {};
	
	function get_from_cache(selector) {
		
		if (undefined === collection[selector]) {
			
			collection[selector] = $(selector);
		
		}
		
		return collection[selector];
    }
	
	return { get: get_from_cache };
}

var sCache = new Selector_Cache();
*/
$("a[href='#top']").click(function() { // Scroll to top 
	
	$('html, body').animate({
		scrollTop:0
	}, 'slow');
	
	return false;
	
});

$('.smooth-scroll').click(function(event) { // Smooth internal link scroll
	
	var target = $(this.hash);
	
	//var scrollTo = $(target).offset().top - navHeight - 20; // 20px offset
	var scrollTo = $(target).offset().top;
	
	$('html, body').animate({scrollTop:scrollTo}, 'slow');
	
	return false;

});

$('.click-auto').each(function() { // Auto click

	$(this)[0].click();
	
});

$('.click-delay').each(function() { // Delay click
	
	var $this = $(this);
	var delay = $this.attr('data-delay') * 1000; // To get milliseconds
	
	setTimeout(function() {
		$this[0].click();
	}, delay);
	
});

$('.js-hide').hide(); // Only show when no Javascript

$('.toggle-content').not('.toggle-open').hide();

$('.toggle-open').each(function() {
	
	thisID = $(this).attr('id');
	$('*[data-toggle='+thisID+']').find('.toggle-icon i').toggleClass('fa-rotate-90 norotate');
	
});

$('.js-show, .toggle-icon').show(); // Only show when Javascript exists

$('.anim-hover').mouseover(function() {	// Hover animation
	
	var animType = $(this).attr('data-anim');	
	$(this).addClass(animType);
	
});

$('.anim-click').click(function() { // Click animation
	
	var animType = $(this).attr('data-anim');	
	$(this).addClass(animType);
	
});

$(".toggle-title").click(function(event) { // Toggle
	
	event.preventDefault();
	
	toggle = $(this).attr('data-toggle');

	$('#'+toggle).slideToggle(250).toggleClass('toggle-open');
	$(this).find('.toggle-icon i').toggleClass('fa-rotate-90 norotate');

});

$(".toggle-all").click(function(event) { // Toggle
	
	event.preventDefault();
	
	html = $(this).html();
	label = $(this).attr('data-label');
	
	$(this).html(label).toggleClass('expanded');
	$(this).attr('data-label', html);
	
	var isOpen = false;
	
	if ($(this).hasClass('expanded')) {
		var isOpen = true;
	}
	
	$('.toggle-content').each(function() {
		
		if (isOpen == true && !$(this).hasClass('toggle-open') || isOpen == false && $(this).hasClass('toggle-open')) {
			
			thisID = $(this).attr('id');
			
			$(this).slideToggle(250).toggleClass('toggle-open');
			
			$('*[data-toggle='+thisID+']').find('.toggle-icon i').toggleClass('fa-rotate-90 norotate');
			
		}
		
	});

});

$('[data-remember]').each(function() { // For each dismiss button
	
	toHide = $(this).closest("div").attr("id"); // Get div to hide
	
	if (document.cookie.indexOf('dismissed-'+toHide) > -1 ) { // If it has already been hidden
	
		$('#'+toHide).hide(250);
		
	}

});

// Dismiss (and remember) div's

$('.msg-dismiss').click(function() { // Dismiss
	
	if ($(this).attr('data-dismiss')) {
		
		$('#'+$(this).attr('data-dismiss')).slideUp(250);
		
		if ($(this).attr('data-remember')) { // !TODO: Check if is number
			
			dismiss = $(this).attr('data-remember'); // In hours
			
			if (dismiss == 0) {
				dismiss = 8760; // One year
			}
			
			setCookie('dismissed-'+$(this).attr('data-dismiss'), 'true', dismiss);
			
		} // End if data-remember
		
	} // End if data-dismiss

});

$('.set-cookie').click(function() { // Set cookie
	
	if ($(this).attr('data-cookie-name') && $(this).attr('data-cookie-value') && $(this).attr('data-cookie-duration') && $.isNumeric($(this).attr('data-cookie-duration'))) { // Is name, value and duration set?
		
		duration = $(this).attr('data-cookie-duration'); // In hours
		
		if (duration == 0) {
			duration = 8760; // One year
		}
		
		setCookie($(this).attr('data-cookie-name'), $(this).attr('data-cookie-value'), duration);
		
	}

});

$('.progress-amt').each(function() { 
	
	if ($(this).attr('data-valuenow')) { // !TODO: If numerical
		
		label = $(this).html();
	
		$(this).css({ width: '0px' }).html(''); // Reset
		
		pctNow = $(this).attr('data-valuenow');
		
		 if ($(this).attr('data-valuemax') && $(this).attr('data-valuemin')) { // !TODO: If these are numerical
	
			 pctNow = ($(this).attr('data-valuenow') / ($(this).attr('data-valuemax') - $(this).attr('data-valuemin'))) * 100;
			 
		 }
	
		$(this).animate({ width:pctNow+'%' }, 500).html(label);  // !TODO: Animate when in view

	}
		
});

// -------------------- Top nav --------------------

$('#wrapper').on('click', function() {
	
	if ($(window).width() < 600) { // Top nav menu breakpoint
		
		$('#top-nav-list').slideUp(250); // Close menu if main content area is clicked
	
	}

});

$('#top-nav-toggle').on('click', function() { // Toggle open/close menu when hamburger is clicked
	
	$('#top-nav-list').slideToggle(250); 

});

// -------------------- Document Ready --------------------

$(document).ready(function() {
	
	// Above fold (throttled)
	var afTimer;
	
	$(window).resize(function() {
		clearTimeout(afTimer);
		afTimer = setTimeout(aboveFold, 100); // 100ms
	}).resize();
	
	if (typeof WOW !== "undefined") {
		new WOW().init(); // Animate when in view
	}

}); // End document ready


/* -------------------- Scroll -------------------- */

$(window).scroll(function() {

	showToTop();
	
}); // End window scroll

/* -------------------- Window resize -------------------- */



$(window).resize(function() {
	
	showTopNav();
	
}); // End window resize


/* 
##############################################################
Functions				
##############################################################
*/

function setCookie(name, value, exp) { // Exp in hours
	var now = new Date();
	now.setTime(now.getTime()+(exp*60*60*1000));
	document.cookie= name + "=" +value+ "; expires=" + now.toGMTString() + "; path=/"
}

function removeCookie(name) {
	var now = new Date();
	now.setTime(now.getTime()-3600);
	document.cookie= name + "=" +''+ "; expires=" + now.toGMTString() + "; path=/"	
}



function showTopNav() {
	
	if ($(window).width() >= 600) { // Top nav menu breakpoint
		
		//$('#main-nav-list').show(); // Open menu

	} else {

		$('#top-nav-list').hide(); // Close menu		
		
	}
}

function showToTop() {
	
	var buffer = 300; // Scrolling buffer in px

	if ($(window).scrollTop() > buffer) {
		
		$('#top-button').fadeIn();
	
	} else {
		
		$('#top-button').fadeOut();	
	}
	
}

function aboveFold() {
	
	setHeight = $(window).height();
	
	if ($('#top-nav-container').length) {	
		setHeight = setHeight - $('#top-nav-container').height();
	}
	//console.log('window height is '+$(window).height()+' and nav height is '+$('#top-nav-container').height()+' and set height is '+setHeight);
	
	if (setHeight > 800) {
		setHeight = 800;	
	}

	$('.above-fold').css("min-height", setHeight + "px");

}