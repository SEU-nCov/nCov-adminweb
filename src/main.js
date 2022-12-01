import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import echarts from "echarts";
// import BMap from 'BMap';
// import "echarts/extension/bmap/bmap";
import "echarts-extension-amap";
import Viewer from 'v-viewer'
import JsonExcel from "vue-json-excel";
import 'viewerjs/dist/viewer.css'
import 'element-ui/lib/theme-chalk/index.css';


import router from '../router'
import store from '../store'
import admin from '../store/admin.js'
import http from 'axios'
import global from './global/global.js'
// import 'element-theme-chalk'
// import {MessageBox} from 'element-ui'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Viewer)

Vue.prototype.$http = http;
Vue.prototype.$global = global
Vue.prototype.$echarts = require("echarts")
Vue.prototype.$admin = admin
// Vue.prototype.$BMap = BMap
Vue.component('downloadExcel', JsonExcel)
// Vue.prototype.$jsonExcel = JsonExcel
// Vue.prototype.$echarts = echarts;
// Vue.prototype.$confirm=MessageBox.confirm;

Viewer.setDefaults({
	Options: {
		'inline': true,
		'button': true,
		'navbar': true,
		'title': true,
		'toolbar': true,
		'tooltip': true,
		'movable': true,
		'zoomable': true,
		'rotatable': true,
		'scalable': true,
		'transition': true,
		'fullscreen': true,
		'keyboard': true,
		'url': 'data-source'
	}
})

router.beforeEach((to, from, next) => {

	store.commit('getToken')
	const token = store.state.user.token
	if (!token && to.name !== 'login') {
		next({
			name: 'login'
		})
	} else if (token && to.name === 'login') {
		next({
			name: 'home'
		})
	} else {
		next()
	}
	// store.commit('clearToken')
})

new Vue({
	store,
	router,
	render: h => h(App),
	created() {
		this.$store.commit('addMenu', router)
	}
}).$mount('#app')
