/*
pa.js
Author: Willie Lawrence
Email: cptx032 arroba gmail dot com
*/
////////// depends of pa.js //////////
var PA_PANEL_FONT_SIZE = 0.03;
function pa_panel_set_display(items, display) {
	var i = items.length;
	while(i--) {
		_(items[i].id).style.display = display;
	}
}

function pa_panel_set_display_none(items) {
	pa_panel_set_display(items, 'none');
}

function pa_panel_set_display_block(items) {
	pa_panel_set_display(items, 'block');
}

function pa_panel_set_opacity(items, opacity) {
	var i = items.length;
	while (i--) {
		_(items[i].id).style.opacity = opacity;
	}
}

function pa_panel_hide(items) {
	pa_panel_set_opacity(items, 0);
	setTimeout(function() {
		pa_panel_set_display_none(items);
	}, 500);
}

/*
gets all menu buttons and deactive all of them
*/
function pa_panel_deactive_all() {
	var buttons = document.getElementsByClassName('panel-active');
	var i = buttons.length;
	while(i--)
	{
		pa_panel_hide( buttons[i].pa_panel_items );
		buttons[i].className = 'panel-item';
	}
}

/*
actives a button
*/
function pa_panel_active(button) {
	button.className = 'panel-item panel-active';
	pa_panel_set_display_block( button.pa_panel_items );
	pa_panel_set_opacity( button.pa_panel_items, 1 );
}

/*
returns the DOM of the panel title
*/
function pa_panel_create_title(title) {
	var title_elem = pa_create_tag(
		'div',
		'pa-panel-title',
		document.body);
	title_elem.textContent = title;
	title_elem.className = 'bold';
	pa_add({
		id: 'pa-panel-title',
		height: 0.1,
		left: 0.05,
		fontSize: PA_PANEL_FONT_SIZE,
		top: 0.025
	});
	return title_elem;
}

/*
creates a menu button
args:
	label: <String> : the text showed in the link
	index: <Integer> : the index of label, each
		button must have a different index, it
		composes the html 'id' attribute
	parent: <HTMLElement> : the parent of button
*/
function pa_panel_create_button(label, index, parent) {
	var item = pa_create_tag(
		'a',
		'pa-panel-item-' + index,
		parent);
	item.innerHTML = label;
	item.href = 'javascript:void(0);';
	item.className = 'panel-item';

	item.addEventListener('click', function() {
		pa_panel_deactive_all();
		// change the opacity only to the actual selected
		pa_panel_set_opacity( this.pa_panel_items, 1 );
		pa_panel_active( this );
	});

	return item;
}

/*
args:
	title: <String> : The title of menu
	activated_index: <Integer> : the index of button
		that is activated in start
	items: <List> : a list where each item is like:
		{name: '<label>', items:[pa_dict1, pa_dict1]}
		where pa_dictX is a normal pa dictionary
*/
function pa_panel(title, activated_index, items) {
	var title_elem = pa_panel_create_title( title );
	// all menu buttons are located in this panel
	var panel_div = pa_create_tag(
		'div',
		'pa-panel',
		document.body);
	panel_div.className = 'pa-panel';
	/////////////////////////////////////////////////////// creating items
	var len = items.length;
	var i = 0;
	while (i < len) {
		var button = pa_panel_create_button(items[i].name, i, panel_div);
		// this saves the pa dicts. its used in 'click' function of button
		// see: 'pa_panel_create_button'
		button.pa_panel_items = items[i].items;
		// add to Pa the content
		pa_add_many( items[i].items );
		// changing the opacity of elements
		pa_panel_set_opacity( items[i].items, 0 );
		// add the panel button with the width of page
		// the width must fit all width
		pa_add({
			id: button.id,
			width: 1.0 / len,
			left: (1.0 / len) * i,
			fontSize: PA_PANEL_FONT_SIZE
		});

		i++;
	}
	// activating by the index passed in argument
	pa_panel_active( _('pa-panel-item-'+activated_index) );

	pa_add({
		id: 'pa-panel',
		top: 0.075,
		width: 1.0,
		left: 0,
		fontSize: 0.03
	});
}
