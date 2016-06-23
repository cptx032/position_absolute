/*
pa.js
Author: Willie Lawrence
Email: cptx032 arroba gmail dot com
*/
function absolutize()
{
	var W_HEIGHT = window.innerHeight;
	var W_WIDTH = window.innerWidth;
	
	var pa_elems = window.pa_elems;
	var length = pa_elems.length;
	var elem;
	var s; // style
	while ( length-- )
	{
		elem = document.getElementById( pa_elems[length].id );
		s = elem.style;
		s.position = 'fixed';
		if ( pa_elems[length].width != undefined )
		{
			s.width = (W_WIDTH * pa_elems[length].width) + 'px';
		}
		if ( pa_elems[length].height != undefined )
		{
			s.height = (W_HEIGHT * pa_elems[length].height) + 'px';
		}
		if ( pa_elems[length].left != undefined )
		{
			s.left = (W_WIDTH * pa_elems[length].left) + 'px';
		}
		if ( pa_elems[length].right != undefined )
		{
			s.right = (W_WIDTH * pa_elems[length].right) + 'px';
		}
		if ( pa_elems[length].bottom != undefined )
		{
			s.bottom = (W_HEIGHT * pa_elems[length].bottom) + 'px';
		}
		if ( pa_elems[length].top != undefined )
		{
			s.top = (W_HEIGHT * pa_elems[length].top) + 'px';
		}
		// font size é baseado no height
		if ( pa_elems[length].fontSize != undefined )
		{
			s.fontSize = (W_HEIGHT * pa_elems[length].fontSize) + 'px';
		}
		if ( pa_elems[length].center_horizontal )
		{
			s.left = (W_WIDTH/2.0) - ((elem.width||elem.clientWidth)/2.0) + 'px';
		}
		if ( pa_elems[length].center_vertical )
		{
			s.top = (W_HEIGHT/2.0) - ((elem.height||elem.clientHeight)/2.0) + 'px';
		}
	}
}
function pa_start( elems )
{
	window.pa_elems = elems;
	absolutize();
}