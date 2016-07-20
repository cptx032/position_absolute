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
	/////////////////////////////////////////////////////////////////////
	var label = pa_create_tag('div', 'pa-toast-entry-label', PA_TOAST_BG);
	label.className = 'pa pa-toast pa_top_0.5 pa_width_1 pa_fontSize_0.07';
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

function pa_toast_prompt_default_handler(func) {
	if ( func ) {
		func( _('pa-toast-entry-prompt').value );
	}
	pa_hide_toast(function(){
		/// deleting items created
		PA_TOAST_BG.removeChild( _('pa-toast-entry-label') );
		PA_TOAST_BG.removeChild( _('pa-toast-entry-prompt') );
		PA_TOAST_BG.removeChild( _('pa-toast-btn-ok') );
		PA_TOAST_BG.removeChild( _('pa-toast-btn-cancel') );
	});
}

function pa_toast_prompt(message, type, ok_function, cancel_function) {
	pa_toast_start();
	var _type = 'text';
	if (type) {
		_type = type;
	}
	/////////////////////////////////////////////////////////////////////
	var label = pa_create_tag('div', 'pa-toast-entry-label', PA_TOAST_BG);
	label.className = 'pa pa-toast pa_top_0.01 pa_width_1 pa_fontSize_0.07';
	label.innerHTML = message;
	label.style.textAlign = 'center';
	pa_add( label );
	/////////////////////////////////////////////////////////////////////
	var entry = pa_create_tag('input', 'pa-toast-entry-prompt', PA_TOAST_BG);
	entry.type = _type;
	entry.className = 'pa pa-toast pa_top_0.5 pa_width_1 pa_fontSize_0.07';
	pa_add( entry );
	/////////////////////////////////////////////////////////////////////
	var btn_ok = pa_create_tag('button', 'pa-toast-btn-ok', PA_TOAST_BG);
	btn_ok.textContent = 'ok';
	btn_ok.className = 'pa pa-toast pa_bottom_0 pa_width_0.5 pa_left_0 pa_fontSize_0.05';
	pa_add( btn_ok );
	/////////////////////////////////////////////////////////////////////
	var btn_cancel = pa_create_tag('button', 'pa-toast-btn-cancel', PA_TOAST_BG);
	btn_cancel.textContent = 'cancel';
	btn_cancel.className = 'pa pa-toast pa-button-cancel pa_bottom_0 pa_width_0.5 pa_left_0.5 pa_fontSize_0.05';
	pa_add( btn_cancel );
	/////////////////////////////////////////////////////////////////////
	/// bindings
	btn_ok.addEventListener('click', function() {
		pa_toast_prompt_default_handler( ok_function );
	});
	btn_cancel.addEventListener('click', function() {
		pa_toast_prompt_default_handler( cancel_function );
	});
	entry.focus();

	pa_show_toast();
}