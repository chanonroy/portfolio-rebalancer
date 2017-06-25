function Balancer() {

  // --- Data ----
   this.stocks = [
     {
       ticker: 'XIC',
       price: 10,
       quantity: 2,
       target: 0.5
     },
     {
       ticker: 'VTI',
       price: 5,
       quantity: 2,
       target: 0.5
     }
   ];
   this.market_val = this.stocks.reduce(function(acc,val){
     prod = val.price * val.quantity
     return acc + prod
   },0)

   this.cash = 0
   this.capital = this.market_val + this.cash;
   this.actions = [];

   // ---- Methods ----

   /**
   * {Float} price - price of stock
   * {Float} total_money - total assets
   * {Float} target - percentage (out of 1)
   */
   this.optimal_calc = function(price, total_money, target) {

     var tmp = target * total_money / price;
     var optimal = Number(tmp);
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

   this.main = function() {

     for (var i in this.stocks) {
       var optimal = this.optimal_calc(this.stocks[i].price, this.capital, this.stocks[i].target);
       var delta = this.rebalance(optimal, this.stocks[i].quantity);

       // conditional for extra capital

       this.actions.push({
         ticker: this.stocks[i].ticker,
         action: delta
       });
     }
     console.log(this.capital);
     console.log(this.actions);
     console.log(this.market_val);
   };

 }

 var balance = new Balancer();

 balance.main();
