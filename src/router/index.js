import Vue from 'vue'
import Router from 'vue-router'
import Index from 'views/index'
import Login from 'views/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'views',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
