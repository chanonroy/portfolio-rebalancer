const assert = require('assert');
const Rebalancer = require('../src/rebalancer');
const test2 = require('./data/data2');


describe('Simple tests', function() {
  it('should not have actions when there is no cash', function() {
    var result = new Rebalancer(test2, 0).main();
    assert.equal(result.total_actions, 0);
  });
});
