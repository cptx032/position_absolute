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

var PA_CHECK_BOX = '' +
		'<div style="margin-left: 10px;">' +
			'<input type="checkbox" class="pa-check-box pa-hidden"/>'+
			'<label class="pa-label-check"></label>'+
		'</div>';


function pa_menu_get_title_elem(title, classes) {
	return '<span class="' + classes + '">' + title + '</span>';
}

/*
when clicked call 'handler'
*/
function pa_menu_add_item(parentid, title, description, handler, disabled) {
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
	var title_elem = pa_menu_get_title_elem(title, disabled ? 'pa-menu-title-disabled' : '');
	if (description) {
		item.innerHTML = title_elem + '<br><div style="font-size: 80%;" class="pa-menu-item-desc">' + description + '</div>';
	}
	else {
		item.innerHTML = '<center>' + title_elem + '</center>';
	}
	var pa_dict = {
		width: 1.0,
		left: 0.0,
		top:  PA_MENU_ITEM_Y_POS,
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

/*
args:
	parentid: the parent element of menu
	description: the title showed
	onclick: the function that will be runned on click
		it receives two args: (evt, checked). where evt
		is the event object
		and checked is a boolean with the current value
*/
function pa_menu_add_check(parentid, description, onclick, checked) {
	var result = pa_menu_add_item(parentid, description, PA_CHECK_BOX, function(event) {
		var checkbox = this.getElementsByTagName('input')[0];
		checkbox.checked = !checkbox.checked;
		if (onclick) {
			onclick(event, checkbox.checked);
		}
	});
	var input_html = result.getElementsByTagName('input')[0];
	var label_html = result.getElementsByTagName('label')[0];
	input_html.id = 'pa-input-' + PA_MENU_ITEM_Y_POS;
	label_html.htmlFor = 'pa-input-' + PA_MENU_ITEM_Y_POS;
	input_html.checked = checked || false;
	return result;
}

function pa_menu_remove_item() {
	// fixme
}
