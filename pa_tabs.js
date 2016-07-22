/*
pa.js
Author: Willie Lawrence
Email: cptx032 arroba gmail dot com
*/
/// depends of pa.js

/*
fixme > style guide
+ pa-tab-menu: the container of buttons tabs
+ pa-tab-menu-item: the style of each button tab (when deactive)
+ pa-tab-menu-item-active: the style of button tab when active
+ pa-tab-menu-content: the style of container of content
*/

/*
two separeted divs:
	+ the tabs panel
		+ has many items, the item should not
			use pa directly, but the panel do
	+ the content div
		+ has many items, the item should not
			use pa directly, but the content panel
			do
each item has a 'pa-tab-id-' class where the rest of class name
is the id of content item
*/

function pa_tabs_contains_class(elem, className) {
	if (elem.classList) {
		return elem.classList.contains( className );
	}
	// fixme > old browsers
	return null;
}

/*
remove a CSS class from element
*/
function pa_tabs_remove_class(elem, className) {
	if (elem.classList) {
		elem.classList.remove( className );
	}
	else {
		// fixme > old browsers
	}
}

/*
add a CSS class to element
*/
function pa_tabs_add_class(elem, className) {
	if (elem.classList) {
		elem.classList.add( className );
	}
	else {
		// fixme > old browsers
	}
}

/*
returns the suffix of 'pa-tab-id-' class
*/
function pa_tabs_get_content_item_id(item_tab) {
	var classes = item_tab.className.split(' ');
	var i = classes.length;
	while (i--) {
		if (classes[i].substr(0,10) == 'pa-tab-id-') {
			return classes[i].substr(10); // the rest
		}
	}
}

/*
sets pa_dict.left to -1
*/
function pa_tabs_hide_elem(elem) {
	elem.pa_dict.left = -1;
	pa_update_elem(elem);
}

/*
sets pa_dict.left to 0
*/
function pa_tabs_show_elem(elem) {
	elem.pa_dict.left = 0;
	pa_update_elem(elem);
}

/*
args:
	tab_elem: <HTMLDom>
	active_elem: <HTMLDom>
*/
function pa_tabs_active_tab(tab_elem, active_elem) {
	var items = tab_elem.getElementsByClassName('pa-tab-menu-item');
	var i = items.length;
	while ( i-- ) {
		pa_tabs_remove_class(items[i], 'pa-tab-menu-item-active');
		pa_tabs_hide_elem( _( pa_tabs_get_content_item_id(items[i]) ) );
	}
	pa_tabs_add_class(active_elem, 'pa-tab-menu-item-active');
	pa_tabs_show_elem( _( pa_tabs_get_content_item_id(active_elem) ) );
}

function pa_tabs_start(id_panel, id_content, active_index) {
	var tab_elem = _( id_panel );
	var items = tab_elem.getElementsByClassName('pa-tab-menu-item');
	var i = 0;
	var items_length = items.length;
	var item_width = 1.0 / items_length;
	while ( i < items_length ) {
		var item = items[i];
		item.className += ' pa_width_' + item_width + ' pa_left_' + (i*item_width);
		pa_add( item );
		/// bindings
		item.addEventListener('click', function() {
			pa_tabs_active_tab(tab_elem, this);
		});
		++i;
	}
	pa_tabs_active_tab( tab_elem, items[active_index] );
}