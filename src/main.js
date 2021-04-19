import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router/index'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'

// axios.defaults.withCredentials=true;
axios.defaults.baseURL='http://z3773e6368.qicp.vip/'
axios.interceptors.request.use(function (config) {
  let token = window.localStorage.getItem('token')
  if (token) {
    let token = JSON.parse(token)
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
Vue.prototype.$http = axios
new Vue({
  el: '#app',
  store:store,
  router:router,
  render: c => c(App)
})
