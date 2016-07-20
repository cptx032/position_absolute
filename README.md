# Pa - Position Absolute
Pa is a "cross platform javascript design script". It turns all elements in your HTML responsive.

Import the script
```html
<script type="text/javascript" charset="utf-8" src="position_absolute/pa.js"></script>
<!-- this div will be always 50% of page, in ANY device, with no CSS "hacks" -->
<div class="pa pa_top_0 pa_width_1 pa_height_0.5">
ok
</div>
```

Start the script:
```javascript
pa_start();
```

pa_dict attribute structure:
```javascript
var elem_attrs = {
  top: 0.0,
  bottom: 0.0,
  left: 0.0,
  right: 0.0,
  center_vertical: true,
  center_horizontal: true,
  fontSize: 0.01 // based in screen's height
};
```

## pa_toast
## pa_panel

## pa_db
**pa_db** doesn't deppends of pa.js, its a "separated" module. It abstracts the use of storaging. If HTML5 storage is available it use it, else cookies are used.
### pa_db_get
returns the value of a key

#### pa_db_set
sets the value of a key
#### pa_db_del
deletes a key
#### pa_db_exists
returns true if key exists
