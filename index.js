'use strict';
var co = require('co');
var isGeneratorFn = require('is-generator').fn;

var __forEach = Array.prototype.forEach;
var __coForEach = co.wrap(function*( callback, thisArg ) {
  // Production steps of ECMA-262, Edition 5, 15.4.4.18
  // Reference: http://es5.github.com/#x15.4.4.18
  // Based from MDN
  var T, k = 0;
  if ( this == null ) {
    throw new TypeError( " this is null or not defined" );
  }
  var O = Object(this);
  var len = O.length >>> 0;
  if ( {}.toString.call(callback) != "[object Function]" ) {
    throw new TypeError( callback + " is not a function" );
  }
  if ( thisArg ) T = thisArg;
  while( k < len ) {
    var kValue;
    if ( k in O ) {
      kValue = O[ k ];
      yield co.wrap( callback ).call( T, kValue, k, O );
    }
    k++;
  }
});

var enableCoForEach = function(Array) {
  if (Array.prototype.forEach !== __forEach) return;
  Array.prototype.forEach = function(fn) {
    if (isGeneratorFn(fn)) {
      return __coForEach.apply(this, arguments);
    } else {
      __forEach.apply(this, arguments);
    }
  };
};

var disableCoForEach = function(Array) {
  if (Array.prototype.forEach !== __forEach) {
    Array.prototype.forEach = __forEach;
  }
};

module.exports = {
  disabled : function() {
    disableCoForEach(Array);
  },
  enabled : function() {
    enableCoForEach(Array);
  }
};
enableCoForEach(Array);