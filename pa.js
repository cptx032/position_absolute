/*
pa.js
Author: Willie Lawrence
Email: cptx032 arroba gmail dot com
*/

/*
get by id
*/
function _(id) {
	return document.getElementById(id);
}

/*
updates just a single item
*/
function pa_update_elem( elem ) {
	var W_HEIGHT = window.innerHeight;
	var W_WIDTH = window.innerWidth;
	var dom_elem = _( elem.id );
	var s = dom_elem.style;
	s.position = 'absolute';
	if ( elem.width != undefined ) {
		s.width = (W_WIDTH * elem.width) + 'px';
	}
	else {
		s.width = null;
	}
	
	if ( elem.height != undefined ) {
		s.height = (W_HEIGHT * elem.height) + 'px';
	}
	else {
		s.height = null;
	}
	
	if ( elem.left != undefined ) {
		s.left = (W_WIDTH * elem.left) + 'px';
	}
	else {
		s.left = null;
	}
	
	if ( elem.right != undefined ) {
		s.right = (W_WIDTH * elem.right) + 'px';
	}
	else {
		s.right = null;
	}
	
	if ( elem.bottom != undefined ) {
		s.bottom = (W_HEIGHT * elem.bottom) + 'px';
	}
	else {
		s.bottom = null;
	}
	
	if ( elem.top != undefined ) {
		s.top = (W_HEIGHT * elem.top) + 'px';
	}
	else {
		s.top = null;
	}
	// font size é baseado no height
	if ( elem.fontSize != undefined ) {
		s.fontSize = (W_HEIGHT * elem.fontSize) + 'px';
	}
	else {
		s.fontSize = null;
	}
	
	if ( elem.center_horizontal ) {
		s.left = (W_WIDTH/2.0) - ((dom_elem.width||dom_elem.clientWidth)/2.0) + 'px';
	}
	if ( elem.center_vertical ) {
		s.top = (W_HEIGHT/2.0) - ((dom_elem.height||dom_elem.clientHeight)/2.0) + 'px';
	}
}

/*
function runned when the page is resized
*/
function pa_update_all() {
	var pa_elems = window.pa_elems;
	var length = pa_elems.length;
	var elem;
	while ( length-- )
	{
		elem = pa_elems[length];
		pa_update_elem( elem );
	}
}

/*
starts to verify resize event
*/
function pa_start( elems ) {
	window.pa_elems = elems;
	pa_update_all();

	window.addEventListener('resize', function(){
		// timeout to run in thread
		setTimeout(pa_update_all, 1);
	});
}

/*
add a new item to be managed by Pa
*/
function pa_add( elem ) {
	window.pa_elems.push( elem );
	pa_update_elem( elem );
}