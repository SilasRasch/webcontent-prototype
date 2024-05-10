import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OrderView from'../views/OrderView.vue'
// import OrderPageZero from '../components/OrderPageZero.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/guide',
      name: 'guide',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/bestil',
      name: 'bestil',
      component: OrderView,
      children: [
        { path: '', component: () => import('../components/OrderPageZero.vue')},
        { path: 'first-step', component: () => import('../components/OrderPageOne.vue')},
        { path: 'second-step', component: () => import('../components/OrderPageTwo.vue')},
        { path: 'third-step', component: () => import('../components/OrderPageThree.vue')},
        { path: 'fourth-step', component: () => import('../components/OrderPageFour.vue')},
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/kontrolpanel',
      name: 'kontrolpanel',
      component: () => import('../views/ControlPanelView.vue')
    },
    {
      path: '/admin-confirm',
      name: 'admin-confirm',
      component: () => import('../views/AdminConfirmView.vue')
    },
    {
      path: '/min-side',
      name: 'min-side',
      component: () => import('../views/MyDashboardView.vue')
    }
  ]
})

export default router
