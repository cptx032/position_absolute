/*
pa.js
Author: Willie Lawrence
Email: cptx032 arroba gmail dot com
*/
/// pa_menu
/// depends of pa.js

/*
style guide:
pa-menu-item: the link container
pa-menu-item-desc: the description
*/

var PA_MENU_ITEM_FONT_SIZE = 0.04;
var PA_MENU_ITEM_Y_POS = 0.0;

/*
when clicked call 'handler'
*/
function pa_menu_add_item(parentid, title, description, handler) {
	var parent = _(parentid);
	if (!parent.pa_menu_items) {
		parent.pa_menu_items = [];
	}
	var item_id = 'pa-menu-item-' + parent.pa_menu_items.length;
	var item = pa_create_tag('a',
		item_id,
		parent);
	item.href = 'javascript:void(0);';
	item.style.textAlign = 'left';
	item.className = 'pa-menu-item';
	if (description) {
		item.innerHTML = title + '<br><div class="pa-menu-item-desc">' + description + '</div>';
	}
	else {
		item.innerHTML = '<center class="btn">' + title + '</center>';
	}
	var pa_dict = {
		width: 1.0,
		left: 0.0,
		top: (0.02 * parent.pa_menu_items.length) + PA_MENU_ITEM_Y_POS,
		fontSize: PA_MENU_ITEM_FONT_SIZE
	};
	pa_add( item, pa_dict );
	parent.pa_menu_items.push( pa_dict );

	PA_MENU_ITEM_Y_POS += pa_get_pixel(item.clientHeight, 'y');

	if(handler) {
		item.addEventListener('click', handler);
	}
	return item;
}

function pa_menu_add_button(parentid, description, handler) {
	return pa_menu_add_item(parentid, description, null, handler);
}

function pa_menu_remove_item() {
	//
}
