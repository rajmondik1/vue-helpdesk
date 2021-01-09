import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      // Lazy load of components
      component: () => import( './views/Dashboard')
    },
    {
      path: '/chat/:name',
      name: 'chat',
      component: () => import('./views/Chat')
    },
    {
      path: '/email',
      name: 'email',
      component: () => import('./views/Email')
    }
  ]
})
