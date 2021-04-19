import Vue from 'vue'
import VueRouter from 'vue-router'
import register from '../components/register'
import login from '../components/login'
import shop from '../views/shop'
import detail from '../views/detail'
import showpanel from '../views/showpanel'
import upload from '../views/upload'
Vue.use(VueRouter)

const routes = [
    { path:'/',redirect:'/login'},
    { path: '/register', component: register },
    { path: '/login', component: login },
    { path: '/shop',
    component:shop,
    children:[
        {
            path:"",redirect:"/showpanel"
        },
        {
            path:"/showpanel",component:showpanel
        },
        {
            path:"/detail",component:detail
        },
        
        {
            path:'/upload',component:upload
        }
    ]
    }
]

const router = new VueRouter({
    routes
})
// router.beforeEach((to, from, next) => { 
//     if (to.path === '/login') {
//         window.localStorage.removeItem('token')
//         window.localStorage.removeItem('userinfo')
//     }
//     let token = JSON.parse(window.localStorage.getItem('token'))
//     if (!user && to.path !== '/login' && to.path !== '/register') {
//         next({ path: '/login' })
//     } else {
//         next()
//     }
// })

export default router