import Vue from 'vue'
import VueRouter from 'vue-router'
import register from '../components/register'
import login from '../components/login'
import shop from '../views/shop'
import detail from '../views/detail'
import showpanel from '../views/showpanel'
import upload from '../views/upload'
import personalcenter from '../views/personalcenter'
import manage from '../views/manage'
import managecontent from '../views/managecontent'
import test from '../components/test'
import addresss from '../components/personalcenter/addressesmanage'
import infor from '../components/personalcenter/infor'
import orders from '../components/personalcenter/orders'
import settings from '../components/personalcenter/settings'
import goodscheck from "../components/manager/goodscheck"
import msettings from "../components/manager/msettings"
import usermanage from "../components/manager/usermanage"
import personalgooddetail from "../components/personalcenter/personalgooddetail"
import statistic from "../components/manager/statistic"
import backmsg from "../components/personalcenter/backmsg"
import inbox from "../components/personalcenter/inbox"
import issues from "../components/manager/issues"
Vue.use(VueRouter)

const routes = [
    { path:'/',redirect:'/login'},
    { path: '/register', component: register },
    { path: '/login', component: login },
    { path:"/manage",component:manage},
    { path:"/managecontent",
    component:managecontent,
    children:[
        {
            path:"",redirect:"goodscheck"
        },
        {
            path:"goodscheck",component:goodscheck
        },
        {
            path:"usermanage",component:usermanage
        },
        {
            path:"statistic",component:statistic
        },
        {
            path:"msettings",
            component:msettings
        },
        {
            path:"issues",
            component:issues
        }
    ]},
    { path:'/test',component:test},
    { path: '/shop',
    component:shop,
    children:[
        {
            path:"",redirect:"showpanel"
        },
        {
            path:"showpanel",component:showpanel
        },
        {
            path:"detail",
            component:detail
            
        },
        
        {
            path:'upload',component:upload
        }
    ]
    },
    { path:'/personalcenter',
    component: personalcenter,
    children:[
        {
            path:"",redirect:"infor"
        },
        {
            path:"infor",component:infor
        },
        {
            path:"addresses",component:addresss
        },
        {
            path:"orders",component:orders
        },
        {
            path:"settings",component:settings
        },
        {
            path:"personalgooddetail",component:personalgooddetail  
        },
        {
            path:"inbox",component:inbox
        },
        {
            path:"backmsg",component:backmsg
        }
    ]},
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