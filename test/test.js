(() => {
  'use strict';
  const assert = require('assert');
  const myHello = require('../src/app');
  describe('Test', function() {
    it('should pass', function() {
      assert.equal(myHello.dispatch.start(), 0);
    });
  });
})();
