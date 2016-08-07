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
console.log alias
*/
function __(msg) {
	console.log(msg);
}

/*
creates a html tag element
*/
function pa_create_tag(tag, id, parent) {
	var elem = document.createElement(tag);
	elem.id = id;
	if (parent) {
		parent.appendChild(elem);
	}
	return elem;
}

function pa_update_elem( elem ) {
	// elem is a DOM object
	var W_HEIGHT = window.innerHeight;
	var W_WIDTH = window.innerWidth;
	if (elem.parentElement != document.body) {
		W_HEIGHT = elem.parentElement.clientHeight;
		W_WIDTH = elem.parentElement.clientWidth;
	}
	var style = elem.style;
	style.position = 'absolute';
	////////////////////////////////////////////////////////
	if ( elem.pa_dict.width != undefined ) {
		style.width = (W_WIDTH * elem.pa_dict.width) + 'px';
	}
	else {
		style.width = null;
	}
	////////////////////////////////////////////////////////
	if ( elem.pa_dict.height != undefined ) {
		style.height = (W_HEIGHT * elem.pa_dict.height) + 'px';
	}
	else {
		style.height = null;
	}
	////////////////////////////////////////////////////////
	if ( elem.pa_dict.left != undefined ) {
		style.left = (W_WIDTH * elem.pa_dict.left) + 'px';
	}
	else {
		style.left = null;
	}
	////////////////////////////////////////////////////////
	if ( elem.pa_dict.right != undefined ) {
		style.right = (W_WIDTH * elem.pa_dict.right) + 'px';
	}
	else {
		style.right = null;
	}
	////////////////////////////////////////////////////////
	if ( elem.pa_dict.bottom != undefined ) {
		style.bottom = (W_HEIGHT * elem.pa_dict.bottom) + 'px';
	}
	else {
		style.bottom = null;
	}
	////////////////////////////////////////////////////////
	if ( elem.pa_dict.top != undefined ) {
		style.top = (W_HEIGHT * elem.pa_dict.top) + 'px';
	}
	else {
		style.top = null;
	}
	////////////////////////////////////////////////////////
	// font size é baseado no height
	if ( elem.pa_dict.fontSize != undefined ) {
		style.fontSize = (W_HEIGHT * elem.pa_dict.fontSize) + 'px';
	}
	else {
		style.fontSize = null;
	}
	////////////////////////////////////////////////////////
	if ( elem.pa_dict.centerHorizontal ) {
		style.left = (W_WIDTH/2.0) - ((elem.width||elem.clientWidth)/2.0) + 'px';
	}
	if ( elem.pa_dict.centerVertical ) {
		style.top = (W_HEIGHT/2.0) - ((elem.height||elem.clientHeight)/2.0) + 'px';
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
returns a pa_dict from a class name
*/
function pa_get_pa_dict( class_name ) {
	var attrs = class_name.split(' ');
	var i = attrs.length;
	var pa_dict = {};
	while (i--) {
		var attr = attrs[i];
		// some old browsers doesnt support startsWith
		// so here i use substring
		if (attr.substring(0,3) == 'pa_') {
			var values = attr.split('_');
			pa_dict[ values[1] ] = parseFloat(values[2]);
		}
	}
	return pa_dict;
}

/*
fills the pa_dict attribute of all elements
with "pa" class name
*/
function pa_set_pa_dict( elems ) {
	var i = elems.length;
	while (i--) {
		var elem = elems[i];
		if (!elem.pa_dict) {
			elem.pa_dict = pa_get_pa_dict( elem.className );
			window.pa_elems.push( elem );
		}
	}
}

/*
starts to verify resize event
*/
function pa_start( ) {
	window.pa_elems = [];
	var elems = document.getElementsByClassName('pa');
	pa_set_pa_dict( elems );
	window.addEventListener('resize', function(){
		// timeout to run in thread
		setTimeout(pa_update_all, 1);
	});
	pa_update_all();
}

/*
add a element to be managed by Pa.
if pa_dict is not given the pa will
try parse the className
*/
function pa_add( elem, pa_dict ) {
	if (!pa_dict) {
		pa_dict = pa_get_pa_dict( elem.className );
	}
	elem.pa_dict = pa_dict;
	window.pa_elems.push( elem );
	pa_update_elem( elem );
}

/*
get a value in pixels and returns a value in range [0,1]
*/
function pa_get_pixel(pixels, axis) {
	// fixme > some elements hasn't windows as parent
	var value = 0;
	if (axis == 'x') {
		value = window.innerWidth;
	}
	else {
		value = window.innerHeight;
	}
	return pixels / value;
}