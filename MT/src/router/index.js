import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Layout from '@/views/layout/Layout'
const home = r => require.ensure([], () => r(require('@/views/home/index')), 'home')
const profile = r => require.ensure([], () => r(require('@/views/profile/index')), 'profile')
const design = r => require.ensure([], () => r(require('@/views/designer/index')), 'design')
const cart = r => require.ensure([], () => r(require('@/views/cart/index')), 'cart')
const category = r => require.ensure([], () => r(require('@/views/category/index')), 'category')

export const constantRouterMap = [
  { path: '/404', component: require('@/views/errorPage/404') },
  { path: '/401', component: require('@/views/errorPage/401') },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        redirect: '/home'
      },
      {
        path: '/home',
        component: home
      },
      {
        path: '/profile',
        component: profile
      },
      {
        path: '/design',
        component: design
      },
      {
        path: '/cart',
        component: cart
      },
      {
        path: '/category',
        component: category
      }
    ]
  }
]

export default new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

