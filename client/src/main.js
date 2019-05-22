import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Routes from './routes.js'
import {remaining, average} from './utils/filter'

Vue.config.productionTip = false

Vue.use(VueRouter)

Vue.filter('remaining', remaining)
Vue.filter('average', average)

const router = new VueRouter({
  routes: Routes
})

new Vue({
  el: "#app",
  router: router,
  render: h => h(App)
})
