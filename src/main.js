
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from './app';
import router from './routes';
import store from './store/store';

// import VueAwesomeSwiper from 'vue-awesome-swiper'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import '../static/css/Swiper@4.0.2.css';  // 这里要写相对路径
// import axios from 'axios';
import utils from './common/util/getQueryUtil';
import timeUtil from './common/util/timeUtil';
import mUtil from './common/util/mUtil'
import axios from './common/util/axios';
// 将axios.axiosE 添加到Vue  的原型链上
// axios.defaults.baseURL = 'http://mos.meiyebang.com';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['content-Type'] = 'appliction/x-www-form-urlencoded';

Vue.prototype.axios = axios.axiosE;
Vue.prototype.$utils = utils;
Vue.prototype.$timeUtil = timeUtil;

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(MintUI);
Vue.use(VueAwesomeSwiper);

router.beforeEach((to, from, next) => {

    var token = mUtil.getStore('token');
    // var token = 'testtoken';
    console.log(to);
    if(to.meta.requireAuth){
        if(token ){
          next();
        }else{
          next({
              path:'login',
              // path:'mine/mycenter',
              query: {redirect: to.fullPath} // 跳转路由作为参数 登录成功跳转回来
          });
        }
    }else{
      next();
    };

    // if (token || to.path == '/login'){
    //     console.log('已登录，跳转到' + to.path)
    //     next()  ;// 必须要有一个next() 来继续 不然会死循环 一直进入beforEach 死在这里  逻辑： else里面的执行结果 要匹配if 的条件才会在下一次进入if
    // }
    // else{
    //     console.log('cookie中未检测到token，跳转到登录页面')
    //     router.push({path:'/login'}); // 当if 不匹配即token 不存在且路由不是登录页的情况
    // }

})
// router.go({name:'index'});
window.__lendApp__ = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});