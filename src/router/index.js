import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home'
import List from '../components/list'
import Purcharse from '../components/purcharse'
import Login from '../components/loginPage'
import store from '../store/index'
import Cartogram from '../components/cartogram/index'

Vue.use(Router);

//分开写出路由 新建路由列表
const routes =[
  {
    path: '/',
    component: Home
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/list',
    name: 'List',
    component: List
  },
  {
      path: '/cartogram',
      name: 'Cartogram',
      component: Cartogram
  },
  {
    path: '/purcharse',
    name: 'Purcharse',
    component: Purcharse,
    meta:{
      requireAuth: true
    }
  },
];

//新建一个路由实例
const router = new Router({
  routes
});
if(window.localStorage.getItem('user')){
  console.log(window.localStorage.getItem('user'));
  //取出转换为对象
  store.commit('login/setToken',JSON.parse(window.localStorage.getItem('user')))
}
//对路由进行校验 在路由前对其判断是否需要登录
router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth){
    if(store.getters["login/isToken"]){
      next()
    }else {
      store.commit('footerStatus/hide');
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }else {
    next()
  }
});

//导出这个路由实例
export default router;


//基础新建路由实例
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       component: Home
//     },
//     {
//       path: '/home',
//       name: 'Home',
//       component: Home
//     },
//     {
//       path: '/list',
//       name: 'List',
//       component: List
//     },
//     {
//       path: '/purcharse',
//       name: 'Purcharse',
//       component: Purcharse
//     },
//   ]
// })
