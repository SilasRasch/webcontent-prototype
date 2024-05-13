import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OrderView from'../views/OrderView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProjectView from '../views/ProjectView.vue'
import AdminConfirmView from '../views/AdminConfirmView.vue'
import AdminProjectView from '../views/AdminProjectView.vue'
import AdminDashboardView from '../views/AdminDashboardView.vue'
import CreateUser from '../views/CreateUser.vue'
import { store } from '@/store/store'

// Navigation guards

function auth() { // Make new guard for roles
  if (!store.isLoggedIn) {
    return "/"
  }
}

function guest() {
  if (store.isLoggedIn) {
    return "/"
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/bestil',
      name: 'bestil',
      beforeEnter: auth,
      component: OrderView,
    },
    {
      path: '/kontrolpanel',
      name: 'kontrolpanel',
      beforeEnter: auth,
      component: () => import('../views/ControlPanelView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      beforeEnter: auth,
      component: AdminDashboardView
    },
    {
      path: '/admin/confirm/:id',
      name: 'confirm-order',
      beforeEnter: auth,
      component: AdminProjectView
    },
    {
      path: '/admin/projekt/:id',
      name: 'admin-view-order',
      beforeEnter: auth,
      component: AdminConfirmView
    },
    {
      path: '/min-side',
      name: 'min-side',
      beforeEnter: auth,
      component: DashboardView,
    },
    {
      path: '/min-side/projekt/:id',
      name: 'projekt',
      beforeEnter: auth,
      component: ProjectView,
    },
    {
      path: '/opret',
      name: 'create-user',
      beforeEnter: guest,
      component: CreateUser,
    },
  ]
})

export default router
