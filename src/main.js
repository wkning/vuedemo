// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import axios from 'axios'
import './assets/css/reset.css'
import './components/directive/directive'
import Toast from './components/toast'
import Loading from './components/loading'

Vue.use(Toast);
Vue.use(Loading);

Vue.config.productionTip = false;
axios.defaults.baseURL = 'http://www.mige.in/develop';
Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});
