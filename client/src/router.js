import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import(/* webpackChunkName: "home" */ './views/Home.vue')
const oneBlog = () => import(/* webpackChunkName: "oneBlog" */ './views/oneBlog.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/blog/:id',
      name: 'oneBlog',
      component: oneBlog
    }
  ]
})
