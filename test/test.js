(() => {
  'use strict';
  const expect = require('chai').expect
  const myHello = require('../src/app');
  describe('Test', function() {
    it('should output Done after everything', function() {
      expect('myHello').to.equal('Done');
    });
  });
})();