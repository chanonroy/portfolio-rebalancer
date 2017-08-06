/**
* {Array} portfolio - array of objects (ticker, price, quantity, target)
* {Number} cash - cash available
* {Object} cost_object - variable/fixed transaction costs (v_buy, v_sell, f_buy, f_sell)
*/
function Rebalancer(portfolio, cash, cost_object) {

    // Variables assigned from object parameters
    this.stocks = portfolio;
    this.cash = cash;
    this.v_cost_buy = cost_object.v_buy;
    this.v_cost_sell = cost_object.v_sell;
    this.f_cost_buy = cost_object.f_buy;
    this.f_cost_sell = cost_object.f_sell;

    // Check to make sure target weights sum to <= 1
    this.target_check = this.stocks.reduce(function(acc,val){
      var check_i = val.target
      return acc + check_i
    },0)

    // Calculate the market value of the portfolio
    this.market_val = this.stocks.reduce(function(acc,val){
      var prod = val.price * val.quantity
      return acc + prod
    },0)

    this.capital = this.market_val + this.cash;

    // What will be returned upon completion
    this.actions = [];

     // ---- Methods ----

     this.optimal_calc = function(price, total_money, target) {
       /**
       * {Float} price - price of stock
       * {Float} total_money - total assets
       * {Float} target - percentage (out of 1)
       */
       var tmp = target * total_money / price;
       var optimal = Math.round(tmp);
       return optimal;

     };

     this.rebalance = function(optimal, quantity) {
       /**
       * {Float} optimal - ideal percentage
       * {Number} total_money - total capital
       */
       var delta = optimal - quantity;
       return delta;

     };

     //Determine whether worth rebalancing asset or not
     this.rebalance_decision = function(total_money, v_cost_buy, v_cost_sell, f_cost_buy, f_cost_sell) {

       var boundary = (Math.sqrt((f_cost_buy + f_cost_sell)/(4*total_money)) + (v_cost_buy + v_cost_sell)/4)/100
       return boundary
     }

     // Helper function to sort an array by a key
     this.sortByKey = function(array, key) {
       return array.sort(function(a,b) { return a[key] - b[key];});
     }

     // Main thread of execution
     this.main = function() {

       if (this.target_check > 1) {
         console.log("Your target weights sum to over 1. Please check and try again.");
         return;
       }

       var boundary = this.rebalance_decision(this.capital, this.v_cost_buy, this.v_cost_sell, this.f_cost_buy, this.f_cost_sell)

       for (var i in this.stocks) {
          this.stocks[i].prop = this.stocks[i].quantity*this.stocks[i].price/this.capital;

          var optimal = this.optimal_calc(this.stocks[i].price, this.capital, this.stocks[i].target);

          this.stocks[i].boundary = boundary;

          if (this.stocks[i].prop > this.stocks[i].target + boundary || this.stocks[i].prop < this.stocks[i].target - boundary) {

            var delta = this.rebalance(optimal, this.stocks[i].quantity);

          } else {

            var delta = 0;

          }

          // Calculate new quantity of each asset
          this.stocks[i].quantity_new = this.stocks[i].quantity + delta;

          this.actions.push({
            ticker: this.stocks[i].ticker,
            boundary: this.stocks[i].boundary,
            prop: this.stocks[i].prop,
            action: delta
          });

        }

        // Calculate the new market value of the portfolio
        this.market_val_new = this.stocks.reduce(function(acc,val){
           var prod = val.price * val.quantity_new
           return acc + prod
        },0)

        // If current market value is above initial capital due to rounding
        if (this.market_val_new > this.capital) {

          // Sort by price
          this.sortByKey(this.stocks, this.stocks.price);

          for (var i in this.stocks) {
            if (this.market_val_new > this.capital) {
              // Check if stock has buy signal from rebalancer
              if (this.stocks[i].quantity_new > this.stocks[i].quantity) {
                // If so reduce that stock's quantity by one and recalculate market value
                this.stocks[i].quantity_new = this.stocks[i].quantity_new - 1
                this.market_val_new = this.market_val_new - this.stocks[i].price
              }
            } else {
              break;
            }
          }

          this.actions = [];

          // Recreate actions for console log
          for (var i in this.stocks) {

            this.actions.push({
              ticker: this.stocks[i].ticker,
              boundary: this.stocks[i].boundary,
              prop: this.stocks[i].prop,
              action: this.stocks[i].quantity_new - this.stocks[i].quantity
            });
          }

       }

       // Determine new cash balance and clear actions
       this.cash = (this.capital - this.market_val_new).toFixed(2);

       var total_actions = this.actions.reduce(function(acc, val) {
         return acc + val.action;
       }, 0)

       return {
          "actions": this.actions,
          "cash": this.cash,
          "market_value": this.market_val_new,
          "boundary": this.boundary,
          "total_actions": Math.abs(total_actions)
       }

     };

}

module.exports = Rebalancer;
