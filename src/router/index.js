import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OrderView from'../views/OrderView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProjectView from '../views/ProjectView.vue'
import AdminConfirmView from '../views/AdminConfirmView.vue'
import AdminDashboardView from '../views/AdminDashboardView.vue'
import CreateUser from '../views/CreateUser.vue'

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
    },
    {
      path: '/kontrolpanel',
      name: 'kontrolpanel',
      component: () => import('../views/ControlPanelView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminDashboardView
    },
    {
      path: '/admin/confirm/:id',
      name: 'confirm-order',
      component: AdminConfirmView
    },
    {
      path: '/min-side',
      name: 'min-side',
      component: DashboardView,
    },
    {
      path: '/min-side/projekt/:id',
      name: 'projekt',
      component: ProjectView,
    },
    {
      path: '/opret',
      name: 'create-user',
      component: CreateUser,
    },
  ]
})

export default router
