$(document).ready(function() {
	$('#findprev').click(function() {
		var elem = $(this).prevInDOM('h2');
		elem.fadeOut('fast', function() { 
			elem.fadeIn('slow', function() {
				elem.addClass('active');
			});
		});
	});
	$('#findnext').click(function() {
		var elem = $(this).nextInDOM('a');
		elem.fadeOut('fast', function() { 
			elem.fadeIn('slow', function() {
				elem.addClass('active');
			});
		});
	});
	$('#resetactive').click(function() {
		$('.active').removeClass('active');
	});
});