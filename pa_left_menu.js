/*
pa_left_menu.js
Author: Willie Lawrence
Email: cptx032 arroba gmail dot com
*/

/// DEPENDS PA.JS

/*
styles:
left: pa-lm
hided: pa-lm-hide
shown: pa-lm-show
*/

function pa_lm_show(elem) {
    elem.pa_dict.left = 0;
    pa_add_class(elem, 'pa-lm-show');
    pa_remove_class(elem, 'pa-lm-hide');

    pa_update_elem(elem);
}

function pa_lm_hide(elem) {
    elem.pa_dict.left = -1;
    pa_add_class(elem, 'pa-lm-hide');
    pa_remove_class(elem, 'pa-lm-show');

    pa_update_elem(elem);
}