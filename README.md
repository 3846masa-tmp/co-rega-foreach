# co-foreach
Run generator function as Array.prototype.forEach callback.

## Usage

### Basic
```js
'use strict';
var co = require('co');
var co_foreach = require('co-foreach');

// If callback is normal func, run with original forEach.
[1, 2, 3].forEach(function(num) {
  console.log('Number is %d.', num);
});

co(function*() {
  var request = require('co-request');

  // If callback is generator func, run with co-foreach.
  yield [1, 2, 3].forEach(function*(num) {
    console.log('Number is %d.', num);
    var res = request.get('http://example.com/#' + num);
    console.log('StatusCode : %d', res.statusCode);
  });
  process.exit();
});
```

### Switch between original and co-foreach
```js
'use strict';
var co = require('co');

// co-foreach is enabled.
var co_foreach = require('co-foreach');

// co-foreach is disabled.
co_foreach.disabled();

// co-foreach is enabled.
co_foreach.enabled();
```