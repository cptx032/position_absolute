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

/*
returns a string like <tag>MyString</tag>
*/
function pa_get_tag(tag, content) {
	return '<' + tag + '>' + content + '</' + tag + '>';
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

	window.addEventListener('resize', function(){
		// timeout to run in thread
		setTimeout(pa_update_all, 1);
	});
	pa_update_all();
}

/*
add a new item to be managed by Pa
*/
function pa_add( elem ) {
	window.pa_elems.push( elem );
	pa_update_elem( elem );
}

/*
add many once
*/
function pa_add_many( elems ) {
	var i = 0;
	while (i < elems.length) {
		pa_add(elems[i]);
		pa_update_elem( elems[i] );

		i++;
	}
}

/*
get elem dict by element-id
*/
function pa_get_by_id(id) {
	var i = window.pa_elems.length;
	while (i--) {
		if (window.pa_elems[i].id == id) {
			return window.pa_elems[i];
		}
	}
	return null;
}

/*
transform a pixel value in the 0.0-1.0
range based in window coordenate
*/
function pa_get_pixel(pixel, axis) {
	// axis must be 'x'|'y'
	var window_size = 0;
	if (axis == 'y') {
		window_size = window.innerHeight;
	}
	else if (axis == 'x') {
		window_size = window.innerWidth;
	}
	return pixel / window_size;
}

/*
transform a 0.0-1.0 value in a pixel value
*/
function pa_get_coord_in_pixel(coord, axis) {
	if (axis == 'x') {
		return window.innerWidth * coord;
	}
	else if (axis == 'y') {
		return window.innerHeight * coord;
	}
	return null;
}
