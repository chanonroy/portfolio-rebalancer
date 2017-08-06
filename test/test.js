const assert = require('assert');
const Rebalancer = require('../src/rebalancer');
const test2 = require('./data/data2');

let default_costs = { 'v_buy': 0, 'v_sell': 0, 'f_buy': 0, 'f_sell': 0 };

describe('Simple tests', function() {
  it('should not have actions when there is no cash', function() {
    var result = new Rebalancer(test2, 0, default_costs).main();
    assert.equal(result.total_actions, 0);
  });
});

