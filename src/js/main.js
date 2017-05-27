// Importing
import Vue from 'vue';
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-default/index.css';
import '../scss/main.scss';
import '../assets/_assets.js';

Vue.use(ElementUI);

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
    portfolio: [],
    cash: 0
  },
  computed: {
    total_capital() {
      let total = this.portfolio.reduce(function(acc, stock) {
        return acc + stock.value;
      }, 0);
      return total + this.cash;
    }
  },
  methods: {
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
        target: form.target,
        value: value
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
