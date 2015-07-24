# co-rega-foreach
Run generator function as Array.prototype.forEach callback.

## Usage

### Basic
```js
'use strict';
var co = require('co');
var co_foreach = require('co-rega-foreach');

// If callback is normal func, run with original forEach.
[1, 2, 3].forEach(function(num) {
  console.log('Number is %d.', num);
});

co(function*() {
  var request = require('co-request');

  // If callback is generator func, run with co-rega-foreach.
  yield [1, 2, 3].forEach(function*(num) {
    console.log('Number is %d.', num);
    var res = yield request.get('http://example.com/#' + num);
    console.log('StatusCode : %d', res.statusCode);
  });
  process.exit();
});
```

### Switch between original and co-rega-foreach
```js
'use strict';
var co = require('co');

// co-rega-foreach is enabled.
var co_foreach = require('co-rega-foreach');

// co-rega-foreach is disabled.
co_foreach.disabled();

// co-rega-foreach is enabled.
co_foreach.enabled();
```

## LICENSE

The MIT License (MIT)