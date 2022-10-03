import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import router from '../router'
import store from '../store'
//import hotel from '../store/hotel.js'
import http from 'axios'
import global from './global/global.js'
// import 'element-theme-chalk'
// import {MessageBox} from 'element-ui'

Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.prototype.$http=http;
Vue.prototype.$global=global
//Vue.prototype.$hotel=hotel
// Vue.prototype.$confirm=MessageBox.confirm;

router.beforeEach((to,from,next)=>{
  
  store.commit('getToken')
  const token =store.state.user.token
  if(!token&&to.name!=='login'){
    next({name:'login'})
  }else if(token && to.name==='login'){
    next({name:'home'})
  }
  else{
    next()
  }
  // store.commit('clearToken')
})
new Vue({
  store,
  router,
  render: h => h(App),
  created(){
    this.$store.commit('addMenu',router)
  }
}).$mount('#app')
