import Vue from 'vue'
import Router from 'vue-router'
import HelloContainer from "./components/HelloWorld.vue"
import indexCon from "./components/indexCon.vue"
import newsinfo from "./components/newsinfo.vue"
import login from "./components/login.vue"
import goodlist from "./components/goodlist.vue"
import goodinfo from "./components/goodinfo.vue"
import cart from "./components/cart.vue"
import pay from "./components/pay.vue"
Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',redirect:"/home"},  //重定向
    {path:'/home',component:indexCon},
    {path:'/home/newsinfo',component:newsinfo},
    {path:'/home/login',component:login},
    {path:'/home/goodlist',component:goodlist},
    {path:'/home/goodinfo',component:goodinfo},
    {path:'/home/cart',component:cart},
    {path:'/home/pay',component:pay}
  ]
})
