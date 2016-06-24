# Pa - Position Absolute
Pa is a "cross platform javascript design script". It turns all elements in your HTML responsive.

Import the script
```html
<script type="text/javascript" charset="utf-8" src="position_absolute/pa.js"></script>
<!-- this div will be always 50% of page, in ANY device, with no CSS "hacks" -->
<div id="half-page" style="background-color: red;">
</div>
```

Start the script:
```javascript
pa_start([
  {
    id: 'half-page',
    top: 0.0,
    width: 1.0,
    height: 0.5
  }
]);
```

pa_start attribute structure:
```javascript
var elems = [];
var elem_attrs = {
  top: 0.0,
  bottom: 0.0,
  left: 0.0,
  right: 0.0,
  center_vertical: true,
  center_horizontal: true,
  fontSize: 0.01 // based in screen's height
};
elems.push( elem_attrs );
pa_start( elems );
```
