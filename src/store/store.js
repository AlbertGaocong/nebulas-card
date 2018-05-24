import Vue from "vue";
import Vuex from "vuex";
import storeOption from './index.js'
Vue.use(Vuex);
const store = new Vuex.Store(storeOption)
export default store