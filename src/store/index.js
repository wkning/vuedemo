import Vue from 'vue';
import Vuex from 'vuex';
import footerStatus from './modules/footerStatus'
import collection from './modules/collection'
import login from './modules/login'
Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    footerStatus,
    collection,
    login
  }
});
