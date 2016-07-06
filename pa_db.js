/*
pa.js
Author: Willie Lawrence
Email: cptx032 arroba gmail dot com
*/

/*
returns the value of cookie
*/
function pa_db_get_cookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length,c.length);
		}
	}
	return '';
}

/*
true when localStorage is supported
by browser
*/
var pa_db_support_local_storage = false;
if (localStorage) {
	pa_db_support_local_storage = true;
}

/*
returns a storaged value
*/
function pa_db_get(key) {
	if (pa_db_support_local_storage) {
		return localStorage[key];
	}
	return pa_db_get_cookie(key);
}

/*
sets a storaged value
*/
function pa_db_set(key, value) {
	if (pa_db_support_local_storage) {
		localStorage[key] = value;
	}
	else {
		document.cookie = key + '=' + value;
	}
}

/*
dels a storaged value
*/
function pa_db_del(key) {
	if (pa_db_support_local_storage) {
		localStorage.removeItem(key);
	}
	else {
		document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
	}
}

/*
returns true if a storaged value exists
*/
function pa_db_exists(key) {
	if (pa_db_support_local_storage) {
		if (localStorage[key]) {
			return true;
		}
		return false;
	}
	return pa_db_get_cookie(key) != '';
}