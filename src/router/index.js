import Vue from 'vue'
import Router from 'vue-router'
import RTgame from './game'

Vue.use(Router)

const routes = [...RTgame]

const router = new Router({
  mode: 'history',
  linkActiveClass: 'is-active',
  routes
})

export default router
