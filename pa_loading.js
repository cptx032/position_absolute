/*
pa.js
Author: Willie Lawrence
Email: cptx032 arroba gmail dot com
*/
///// pa_loading.js
///// All elements with the class 'pa-loading'
///// will be 'text loaders'

var pa_loading_interval_handler = null;

function pa_loading_process() {
	var elems = document.getElementsByClassName('pa-loading');
	var i = elems.length;
	while (i--) {
		var elem = elems[i];
		if (elem.textContent == '') {
			elem.textContent = '.';
		}
		else if (elem.textContent == '.') {
			elem.textContent = '..';
		}
		else if (elem.textContent == '..') {
			elem.textContent = '...';
		}
		else if (elem.textContent == '...') {
			elem.textContent = '';
		}
		else {
			elem.textContent = '';
		}
	}
}

function pa_loading_start(interval) {
	var inter = 1000;
	if (interval != undefined) {
		inter = interval;
	}
	pa_loading_interval_handler = setInterval(pa_loading_process, inter);
}

function pa_loading_stop() {
	if (pa_loading_interval_handler) {
		clearInterval(pa_loading_interval_handler);
	}
}