// Importing
import Vue from 'vue';
import ElementUI from 'element-ui'

import '../scss/main.scss';
import '../assets/_assets.js';

Vue.use(ElementUI);

var balancer = new Vue({
  el: '#balancer',
  data: {
    message: 'hello'
  }
})
