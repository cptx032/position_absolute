/*
pa.js
Author: Willie Lawrence
Email: cptx032 arroba gmail dot com
*/
/// depends of pa.js

var PA_TOAST_BG = null;

/*
change the colors of toast
*/
function pa_toast_set_style(bg, fg) {
	if (bg) {
		PA_TOAST_BG.style.backgroundColor = bg;
		PA_TOAST_BG.style.color = fg;
	}
}

/*
returns the element with background
*/
function pa_toast_get_bg_elem() {
	var elem = pa_create_tag('div', 'pa-toast-bg', document.body);
	elem.className = 'pa pa-toast pa-toast-bg pa_width_1 pa_height_1 pa_left_-1 pa_top_0';
	pa_add( elem );
	return elem;
}

function pa_toast_update_all() {
	pa_update_elem( PA_TOAST_BG );
}

function pa_show_toast() {
	PA_TOAST_BG.pa_dict.left = 0;
	pa_toast_update_all();
}

function pa_hide_toast( end_function ) {
	PA_TOAST_BG.pa_dict.left = -1;
	pa_toast_update_all();
	if ( end_function ) {
		setTimeout(function() {
			end_function();
		}, 1000);
	}
}

function pa_toast_start() {
	if ( !PA_TOAST_BG ) {
		PA_TOAST_BG = pa_toast_get_bg_elem();
		pa_hide_toast();
	}
}

/*
Show a toast
args:
	message: the message showed
	msecs: how many time it sleeps before hide it self
	bg: the background color
	fg: the foreground color
	end_function: a function to be executed after message fadeout
*/
function pa_toast(message, msecs, bg, fg, end_function) {
	pa_toast_start();
	// is possible call many times 'pa_toast'
	// so the label has not still removed in hide
	if ( _('pa-toast-entry-label') ) {
		PA_TOAST_BG.removeChild( _('pa-toast-entry-label') );
	}
	/////////////////////////////////////////////////////////////////////
	var label = pa_create_tag('div', 'pa-toast-entry-label', PA_TOAST_BG);
	label.className = 'pa pa-toast pa_centerVertical_1 pa_width_1 pa_fontSize_0.07';
	label.innerHTML = message;
	label.style.textAlign = 'center';
	if ( fg ) {
		label.style.color = fg;
	}
	pa_add( label );
	/////////////////////////////////////////////////////////////////////
	pa_toast_set_style(bg, fg);
	pa_show_toast();
	if (msecs > 0) {
		setTimeout(function() {
			pa_hide_toast( end_function );
			PA_TOAST_BG.removeChild( _('pa-toast-entry-label') );
		}, msecs);
	}
}