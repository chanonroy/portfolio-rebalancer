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

// Instantiate object, compute, and log to console
var rb = new Rebalancer(portfolio, cash);
var result = rb.main();
console.log(JSON.stringify(result));
