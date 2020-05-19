import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../pages/Login/Login'
import demo from '../pages/Index/demo01'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'demo',
    component: demo
  },

]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
