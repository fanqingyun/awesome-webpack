import Route from 'vue-router'
import Vue from 'vue'
import Login from '../modules/login/Login'
import Home from '../modules/home/Home'
import menu from './menu'
Vue.use(Route)

const router = new Route({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [
        ...menu
      ]
    }
  ]
})
export default router
