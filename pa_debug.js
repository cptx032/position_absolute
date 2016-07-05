/*
pa.js
Author: Willie Lawrence
Email: cptx032 arroba gmail dot com
*/
var PA_DEBUG = null;
var ENTER_KC = 13; // key code
var LEFT_KC = 37;
var UP_KC = 38;
var RIGHT_KC = 39;
var DOWN_KC = 40;
// the current widget being controlled
var pa_current_widget = null;
// the current property being controlled
var pa_current_prop = null;
// user interface controll lock. if true,
// the ui is 'locked' and cannot be controlled
var pa_uic_lock = false;
/*
list all widgets controlled by pa
*/
function pa_list(cmd)
{
	var length = window.pa_elems.length;
	console.log('');
	while ( length-- )
	{
		console.log( window.pa_elems[length].id );
	}
}

/*
set the current property
*/
function pa_prop( cmd )
{
	var words = cmd.split( ' ' );
	if (words.length == 1)
	{
		if ( pa_current_prop ) {
			console.log( 'property: "' + pa_current_prop + '"' );
		}
		else {
			console.log( 'property not setted' );
		}
	}
	if ( cmd.split( ' ' )[1] ) {
		pa_current_prop = cmd.split( ' ' )[1];
	}
}

/*
prints the current widget being debugged
*/
function pa_using( cmd )
{
	if ( pa_current_widget ) {
		console.log( 'using "' + pa_current_widget.id + '"!' );
	}
	else {
		console.log( 'using no widget' );
	}
}

/*
set the current widget that will be controlled by pa debug
*/
function pa_use(cmd)
{
	var words = cmd.split(' ');
	if (words.length == 1) {
		if ( pa_current_widget ) {
			console.log( 'using: "' + pa_current_widget.id + '"!' );
		}
		else {
			console.log( 'not setted' );
		}
		return;
	}
	var widget_name = cmd.split(' ')[1];
	if (widget_name)
	{
		var length = window.pa_elems.length;
		while ( length-- )
		{
			if ( window.pa_elems[length].id == widget_name )
			{
				pa_current_widget = window.pa_elems[length];
				return;
			}
		}
		console.log( 'widget "' + widget_name + '" not found...setting widget to null' );
		pa_current_widget = null;
	}
}

/*
Gets a string command and call the correspondent
function.
It gets the first word in the command string and
search a function with the same name but prefixed
by "pa_" string. And then call the function passing
the command string as argument
*/
function process_pa_command( cmd )
{
	eval( 'pa_' + cmd.split(' ')[0] )( cmd );
}

/*
deletes a pa property of current widget
*/
function pa_del( cmd )
{
	if (pa_current_widget && (cmd.split(' ')[1]) ) {
		eval('delete pa_current_widget.' + cmd.split(' ')[1] + ';');
	}
	else {
		console.log('widget not setted');
	}
	pa_update_all();
}

/*
sets a property to a determinated value
*/
function pa_set( cmd )
{
	if (pa_current_widget && cmd.split(' ')[1] && cmd.split(' ')[2] ) {
		eval('pa_current_widget.' + cmd.split(' ')[1] + ' = ' + cmd.split(' ')[2] + ';');
		pa_update_all();
	}
	else {
		console.log( 'wrong command format' );
	}
}

/*
runned when the user clicks in up key
*/
function upk_pa_handler()
{
	if ((!pa_current_widget) && (!pa_current_prop)) { return; }
	if ( !eval('pa_current_widget.' + pa_current_prop) ) {
		eval('pa_current_widget.' + pa_current_prop + '=0.0;');
	}
	eval('pa_current_widget.' + pa_current_prop + ' += 0.01;');
	console.log(pa_current_widget);
	pa_update_all();
}

/*
prints in console the widget attr object
*/
function pa_show( cmd )
{
	if ( pa_current_widget ) {
		console.log( pa_current_widget );
	}
}

function downk_pa_handler()
{
	if ((!pa_current_widget) && (!pa_current_prop)) { return; }
	if ( !eval('pa_current_widget.' + pa_current_prop) ) {
		eval('pa_current_widget.' + pa_current_prop + '=0.0;');
	}
	eval('pa_current_widget.' + pa_current_prop + ' -= 0.01;');
	console.log(pa_current_widget);
	pa_update_all();
}

function leftk_pa_handler()
{
	// fixme
}

function rightk_pa_handler()
{
	// fixme
}

/*
Runned when user clicks some key
*/
function pa_key_handler(evt)
{
	var cmd;
	if ( evt.keyCode == ENTER_KC )
	{
		cmd = PA_DEBUG.value;
		process_pa_command( cmd );
		PA_DEBUG.value = '';
	}
	if (!pa_uic_lock)
	{
		if ( evt.keyCode == UP_KC )
		{
			upk_pa_handler();
		}
		else if ( evt.keyCode == DOWN_KC )
		{
			downk_pa_handler();
		}
		else if ( evt.keyCode == LEFT_KC )
		{
			leftk_pa_handler();
		}
		else if ( evt.keyCode == RIGHT_KC )
		{
			rightk_pa_handler();
		}
	}
}

/*
You must call this function to enable debugging
*/
function pa_debug()
{
	if (PA_DEBUG === null)
	{
		PA_DEBUG = document.createElement('input');
		PA_DEBUG.name = 'pa_debug';
		PA_DEBUG.type = 'text';
		var pa_style = PA_DEBUG.style;
		pa_style.position = 'absolute';
		pa_style.bottom = '0px';
		pa_style.right = '0px';
		pa_style.width = '50%';
		pa_style.border = '1px';
		pa_style.borderColor = '#555';
		pa_style.borderStyle = 'solid';
		pa_style.opacity = '0.5';
		pa_style.padding = '5px';
		pa_style.textAlign = 'left';
		document.body.appendChild( PA_DEBUG );
		PA_DEBUG.addEventListener('keydown', pa_key_handler);
		PA_DEBUG.focus();
	}
}