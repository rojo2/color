# Color

## How to use it

Using [browserify](http://browserify.org) it's easy to use it.

```javascript
var Color = require("color");

var color = new Color();

```

But this works too with [RequireJS](http://requirejs.org).

```javascript
define(["color"], function(Color) {

  var color = new Color();

});
```

or even directly in the browser.

```html

<script src="color/index.js"></script>
<script>

  var color = new Color();

</script>

```

Made with ❤ by ROJO 2 (http://rojo2.com)
