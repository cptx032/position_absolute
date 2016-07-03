/*
pa.js
Author: Willie Lawrence
Email: cptx032 arroba gmail dot com
*/
var PA_TOAST_BG = null;
var PA_TOAST_TEXT = null;
/*
returns a div with the toast
*/
function pa_get_toast_element(message) {
	var fill = document.createElement('div');
	fill.id = 'pa_toast_bg';
	var s_b = fill.style;
	s_b.backgroundColor = '#ffffff';
	var bg_pa = {
		id: 'pa_toast_bg',
		width: 1.0, height: 1.0, left: 0.0, right: 0.0
	};
	s_b.transition = 'opacity 1s';
	document.body.appendChild( fill );
	pa_add( bg_pa );

	var bg = document.createElement('div');
	bg.id = 'pa_toast';
	var s = bg.style;
	s.color = '#000000';
	s.opacity = 0;
	s.textAlign = 'center';
	s.transition = 'opacity 1s'
	bg.innerHTML = message;
	document.body.appendChild( bg );
	var pa_dict = {
		id: 'pa_toast',
		width: 1.0,
		center_vertical: true,
		fontSize: 0.07
	};
	pa_add( pa_dict );
}

function pa_show_toast() {
	PA_TOAST_BG.style.zIndex = 9999;
	PA_TOAST_TEXT.style.zIndex = 10000;

	PA_TOAST_TEXT.style.opacity = 1.0;
	PA_TOAST_BG.style.opacity = 1.0;
}

function pa_hide_toast( end_function ) {
	PA_TOAST_TEXT.style.opacity = 0.0;
	PA_TOAST_BG.style.opacity = 0.0;
	setTimeout(function() {
		PA_TOAST_TEXT.style.zIndex = -1;
		PA_TOAST_BG.style.zIndex = -1;
		if (end_function) {
			end_function();
		}
	}, 1000);
}

/*
change the colors of toast
*/
function pa_toast_set_style(bg, fg) {
	PA_TOAST_TEXT.style.color = fg;

	PA_TOAST_BG.style.backgroundColor = bg;
	PA_TOAST_BG.style.color = fg;
}

/*
Show a toast
*/
function pa_toast(message, msecs, bg, fg, end_function) {
	if (_('pa_toast') == null) {
		pa_get_toast_element(message);
		PA_TOAST_BG = _('pa_toast_bg');
		PA_TOAST_TEXT = _('pa_toast');
	}
	PA_TOAST_TEXT.innerHTML = message;
	pa_toast_set_style(bg, fg);
	pa_show_toast();
	if (msecs > 0) {
		setTimeout(function() {
			pa_hide_toast( end_function );
		}, msecs);
	}
}