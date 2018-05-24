/**
 * @file
 * Created by gaocong on 17/05/06.
 */
 import VueRouter from 'vue-router';  // import 方式为同步加载
const Index = r => require(['views/index/index'], r); // require 方式为异步加载 按需加在
const Headpage = r => require(['views/index/children/headpage'], r); 
const Application = r => require(['views/index/children/application'],r);

const createCard = r => require(['views/createCard/createCard'],r);
const Evaluate = r => require(['views/evaluate/evaluate'], r);
const Demo3 = r => require(['views/demo3/demo3'], r);

// 根目录
const rootPath = '';

// 页面路由
const routes = [
          {path: '/demo3',              component: Demo3,             name: 'demo3'},
          {path: '', redirect: {name: 'headpage'}},
          {
            path: '/index',              
            component: Index,             
            name: 'index',
            children:[
              {
                path:'/headpage',
                name:'headpage',
                component: Headpage
              },
              {
                path: '/createCard',
                component: createCard,
                name: 'createCard'
              }
            ]
          },
          {
            path: '/evaluate',
            component: Evaluate,
            name: 'evaluate'
          }
].map(route => {
  route.path = rootPath + route.path;
  return route;
});

// 404 页
routes.push({path: '*', component: Index, name: 'index'});

// VueRouter.prototype.go = function () {
//   this.isBack = true;
//   window.history.go(-1)
// }
// 创建一个路由对象用于管理页面的路由 将路由移动到这里
const router = new VueRouter({
  mode: 'history',
  routes: routes,
  // base: '/mosapp/'
});
export default router;