function Balancer() {

  // --- Data ----
   this.stocks = [
     {
       ticker: 'XIC',
       price: 10,
       quantity: 5,
       target: 0.4
     },
     {
       ticker: 'VTI',
       price: 5,
       quantity: 3,
       target: 0.6
     }
   ];

   //Calculate the market value of the portfolio
   this.market_val = this.stocks.reduce(function(acc,val){
     prod = val.price * val.quantity
     return acc + prod
   },0)

   //Cash
   this.cash = 0
   //Total Capital
   this.capital = this.market_val + this.cash;
   this.actions = [];

   //Check to make sure target weights sum to <= 1
   this.target_check = this.stocks.reduce(function(acc,val){
     check_i = val.target
     return acc + check_i
   },0)

   // ---- Methods ----

   /**
   * {Float} price - price of stock
   * {Float} total_money - total assets
   * {Float} target - percentage (out of 1)
   */
   this.optimal_calc = function(price, total_money, target) {

     var tmp = target * total_money / price;
     var optimal = Math.round(tmp);
     return optimal;

   };

   /**
   * {Float} optimal - ideal percentage
   * {Number} total_money - total capital
   */
   this.rebalance = function(optimal, quantity) {

     var delta = optimal - quantity;
     return delta;

   };

   function sortByKey(array, key) {

     return array.sort(function(a,b) { return a[key] - b[key];});

   };

   this.main = function() {

     for (var i in this.stocks) {

       if (this.target_check > 1) { break; }

        var optimal = this.optimal_calc(this.stocks[i].price, this.capital, this.stocks[i].target);
        var delta = this.rebalance(optimal, this.stocks[i].quantity);

        // conditional for extra capital

        //Calculate new quantity of each asset
        this.stocks[i].quantity_new = this.stocks[i].quantity + delta

        this.actions.push({
          ticker: this.stocks[i].ticker,
          action: delta
        });

      }

      //Calculate the new market value of the portfolio
      this.market_val_new = this.stocks.reduce(function(acc,val){
        prod = val.price * val.quantity_new
        return acc + prod
      },0)

      //If current market value is above initial capital due to rounding
      if (this.market_val_new > this.capital) {
        //Sort by price
        sortByKey(this.stocks, this.stocks.price);

          for (var i in this.stocks) {

            if (this.market_val_new > this.capital) {
              //Check if stock has buy signal from rebalancer
              if (this.stocks[i].quantity_new > this.stocks[i].quantity) {
                //If so reduce that stock's quantity by one and recalculate market value
                this.stocks[i].quantity_new = this.stocks[i].quantity_new - 1
                this.market_val_new = this.market_val_new - this.stocks[i].price

              }
            } else {break;}
          }

          //Determine new cash balance and clear actions
          this.cash = this.capital - this.market_val_new
          this.actions = [];

          //Recreate actions for console log
          for (var i in this.stocks) {
            this.actions.push({
              ticker: this.stocks[i].ticker,
              action: this.stocks[i].quantity_new - this.stocks[i].quantity
            });

          }
        }

     //Post to console if the sum of target weights is above 1.
     if (this.target_check > 1) {

       console.log("Your target weights sum to over 1. Please check and try again.");

     } else {

       console.log(this.capital);
       console.log(this.actions);
       console.log(this.market_val_new);
       console.log(this.cash);
     }
   };

 }

 var balance = new Balancer();

 balance.main();
