var Rebalancer = require('../src/rebalancer.js');

// Enter cash value here
var cash = 0;

// Create sandbox portfolio here
var portfolio = [
  {
    ticker: 'VIC',
    quantity: 5,
    price: 10.21,
    target: 0.5,
    value: 51.05
  },
  {
    ticker: 'CIX',
    quantity: 10,
    price: 3.68,
    target: 0.4,
    value: 36.8
  }
]
//Enter variable cost here
var v_cost_buy = 5;
var v_cost_sell = 0;

//Enter fixed cost here
var f_cost_buy = 0;
var f_cost_sell = 0;

// Instantiate object, compute, and log to console
var rb = new Rebalancer(portfolio, cash, v_cost_buy, v_cost_sell, f_cost_buy, f_cost_sell);
var result = rb.main();
console.log(JSON.stringify(result));
