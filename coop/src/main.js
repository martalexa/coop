// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store.js'
import router from './router'
import axios from 'axios'

window.axios = axios.create({
  baseURL: 'http://coop.api.netlor.fr/api/',
  params : {
  	token : store.state.token
  },
  headers: { Authorization: 'Token token=27ea72cecd104e96a5732d67151f836a' }
});
Vue.config.productionTip = false

store.subscribe((mutation, state) => {
	localStorage.setItem('store', JSON.stringify(state));
});

window.bus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // qui veut dire store : store
  beforeCreate(){
  	this.$store.commit('initialiseStore');
  },
  template: '<App/>',
  components: { App }
})
