export default function Rebalancer() {

  local_actions = []

  this.optimal_calc = function(price, total_money, target) {
    var tmp = target * total_money / price;
    var optimal = Number(tmp);
    return optimal;
  }

  this.rebalance = function(optimal, quantity) {
    var delta = optimal - quantity;
    return delta;
  }

}
