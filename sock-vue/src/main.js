import Vue from 'vue'
import App from './App.vue'
import router from './router'

import'mint-ui/lib/style.css'

Vue.config.productionTip = false

import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

//1.引入组件
import{Header,Swipe,SwipeItem,Button} from "mint-ui";
//2.注册到当前的项目中
Vue.component(Header.name,Header);
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);
Vue.component(Button.name,Button);

//引入vue-resource发送ajax请求
import VueResource from "vue-resource";
//注册所有组件
Vue.use(VueResource);

//配置VueResource服务根目录
Vue.http.options.root="http://127.0.0.1:3000/"

//时间过滤器
Vue.filter("dateFilter",function(val){
  var date=new Date(val);
  var y=date.getFullYear();
  var m=date.getMonth()+1;
  var d=date.getDate();
  var h=date.getHours();
  var mi=date.getMinutes();
  var s=date.getSeconds();
  m<10&&(m="0"+m);
  d<10&&(d="0"+d);
  s<10&&(s="0"+s);
  return `${y}-${m}-${d} ${h}:${mi}:${s}`;
})

//创建vuex对象
//1.下载安装
//2.引入vuex
import Vuex from "vuex";
//3.注册vuex实例
Vue.use(Vuex);
//4.创建vuex对象
var store=new Vuex.Store({
  state:{
    count:0, //购物车中商品的数量
    isShow:false  //底部导航栏
  }, 
  mutations:{  //修改共享数据的两个方法
    increment(state,c){  //如果没有c，那么购物车数量只会一直是1
      state.count+=c;
    },
    substract(state,c){
      state.count-=c;
    },
    chgShow(state,c){
      state.isShow=c;
    }
  },
  getters:{  //获取数据
    optCount:function(state){
      return state.count;  //返回共享数据
    },
    hasShow(state){
      return state.isShow;
    }
  }
})

//5.将Vuex实例对象注册vue实例
new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
