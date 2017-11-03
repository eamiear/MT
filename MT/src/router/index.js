import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Layout from '@/views/layout/Layout'

export const constantRouterMap = [
  { path: '/404', component: require('@/views/errorPage/404') },
  { path: '/401', component: require('@/views/errorPage/401') },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    children: [{ path: 'dashboard', component: require('@/views/dashboard/index') }]
  }
]

export default new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

