/*
pa_left_menu.js
Author: Willie Lawrence
Email: cptx032 arroba gmail dot com
*/

/// DEPENDS PA.JS, JQUERY

/*
styles:
left: pa-lm
hided: pa-lm-hide
shown: pa-lm-show
*/
var PA_LM_TIME = 600; // milisseconds
function pa_lm_show(elem) {
    $(elem).animate({left:0}, PA_LM_TIME, function () {
        pa_add_class(elem, 'pa-lm-show');
        pa_remove_class(elem, 'pa-lm-hide');
        elem.pa_dict.left = 0;
        pa_update_elem(elem);
    });

}

function pa_lm_hide(elem) {
    $(elem).animate({left:-window.innerWidth}, PA_LM_TIME, function () {
        elem.pa_dict.left = -1;
        pa_add_class(elem, 'pa-lm-hide');
        pa_remove_class(elem, 'pa-lm-show');
        pa_update_elem(elem);
    });
}