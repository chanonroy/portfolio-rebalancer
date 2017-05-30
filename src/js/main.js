// Importing
import Vue from 'vue';
import ElementUI from 'element-ui'
import Tools from './utility.js'

import 'element-ui/lib/theme-default/index.css';
import '../scss/main.scss';
import '../assets/_assets.js';

Vue.use(ElementUI);

// utility functions from utility.js
var tools = new Tools();

var balancer = new Vue({
  el: '#balancer',
  data: {
    tickerModal: false,
    tickerForm: {
      ticker: '',
      quantity: '',
      price: '',
      target: '',
    },
    portfolio: [
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
        target: 0.5,
        value: 36.8
      }
    ],
    cash: 0,
    actions: []
  },
  computed: {
    total_capital() {
      // total value of assets plus cash
      let total = this.portfolio.reduce(function(acc, stock) {
        return acc + stock.value;
      }, 0);
      return total + this.cash;
    },
    total_allocation() {
      // total target allocation of portfolio
      let total = this.portfolio.reduce(function(acc, stock) {
        return acc + stock.target;
      }, 0);
      return total;
    }
  },
  methods: {
    /**
    * {Float} price - price of stock
    * {Float} total_money - total assets
    * {Float} target - percentage (out of 1)
    */
    optimal_calc(price, total_money, target) {

      var tmp = target * total_money / price;
      var optimal = Number(tmp);
      return optimal;

    },

    /**
    * {Float} optimal - ideal percentage
    * {Number} total_money - total capital
    */
    rebalance(optimal, quantity) {

      var delta = optimal - quantity;
      return delta;

    },

    get_action() {
      var local_actions = [];

      for (var i in this.portfolio) {
        let optimal = this.optimal_calc(this.portfolio[i].price, this.total_capital, this.portfolio[i].target);
        let delta = this.rebalance(optimal, this.portfolio[i].quantity);
        if (delta !== 0) {
          local_actions.push({ ticker: this.portfolio[i].ticker, action: Math.round(delta) })
        }
      }

      this.actions = local_actions;
    },

    modal_submit() {
      let form = this.tickerForm;

      // TODO: refine validation
      if (form.ticker.length === 0 || form.quantity.length === 0 || form.price.length === 0) {
        return console.log('bad input');
      }

      let value = form.price * form.quantity;

      // submit stock to portfolio
      this.portfolio.push({
        ticker: form.ticker.toUpperCase(),
        quantity: form.quantity,
        price: form.price,
        value: value,
        target: form.target / 100,
      })

      // clear old form
      form.ticker = '';
      form.quantity = '';
      form.target = '';
      form.price = '';

      // close modal
      this.tickerModal = false;
    }
  }
})
