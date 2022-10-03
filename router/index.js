import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push

//解决报错信息：NavigationDuplicated: Avoided redundant navigation to current location
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes=[
    {
        path:'/',
        name:'Main',
        component: ()=>import('../views/Main.vue'),
        redirect:'/home',
        children:[
            {
                path:'/home',
                name:'home',
                component:()=>import('../views/home')
            },/*
            {
                path:'/user',
                name:'user',
                component: ()=>import('../views/User') 
            },
            {
                path:'/page1',
                name:'page1',
                component: ()=>import('../views/other/pageOne.vue')
            }*/
        ]
    },
    {
        path:'/login',
        name:'login',
        component:()=>import('../views/Login/login.vue')
    }
]
const router=new VueRouter({
    mode:'history',
    routes
})

export default router;