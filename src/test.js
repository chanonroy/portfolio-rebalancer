function Balancer() {

  // --- Data ----
   this.stocks = [
     {
       ticker: 'FB',
       price: 155.07,
       quantity: 8,
       target: 0.2
     },
     {
       ticker: 'GOOG',
       price: 986.09,
       quantity: 7,
       target: 0.3
     },
     {
       ticker: 'AAPL',
       price: 146.28,
       quantity: 3,
       target: 0.1
     },
     {
       ticker: 'GME',
       price: 34.19,
       quantity: 3,
       target: 0.06
     },
     {
       ticker: 'WM',
       price: 73.43,
       quantity: 11,
       target: 0.2
     },
     {
       ticker: 'NKE',
       price: 52.85,
       quantity: 6,
       target: 0.14
     }
   ];

   //Calculate the market value of the portfolio
   this.market_val = this.stocks.reduce(function(acc,val){
     prod = val.price * val.quantity
     return acc + prod
   },0)

   //Cash
   this.cash = 1000
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

          this.actions = [];

          //Recreate actions for console log
          for (var i in this.stocks) {
            this.actions.push({
              ticker: this.stocks[i].ticker,
              action: this.stocks[i].quantity_new - this.stocks[i].quantity
            });

          }
        }

     //Determine new cash balance and clear actions
     this.cash = (this.capital - this.market_val_new).toFixed(2);

     //Post to console if the sum of target weights is above 1.
     if (this.target_check > 1) {

       console.log("Your target weights sum to over 1. Please check and try again.");

     } else {

       console.log("You have", this.capital, "in assets.");
       console.log(this.actions);
       console.log("You have", this.market_val_new, "in stocks.");
       console.log("You have", this.cash, "in cash.");
     }
   };

 }

 var balance = new Balancer();

 balance.main();
