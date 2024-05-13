import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OrderView from'../views/OrderView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProjectView from '../views/ProjectView.vue'
import AdminConfirmView from '../views/AdminConfirmView.vue'
import CreateUser from '../views/CreateUser.vue'
import { store } from '@/store/store'

// Navigation guards

function user() {
  if (!store.isLoggedIn && !store.role !== "Bruger") {
    return "/"
  }
}

// function creator() {
//   if (!store.isLoggedIn && !store.role !== "Creator") {
//     return "/"
//   }
// }

function admin() {
  if (store.role !== "Admin" && !store.isLoggedIn) {
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
      beforeEnter: user,
      component: OrderView,
    },
    {
      path: '/kontrolpanel',
      name: 'kontrolpanel',
      beforeEnter: [user, admin],
      component: () => import('../views/ControlPanelView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      beforeEnter: admin,
      component: DashboardView
    },
    {
      path: '/admin/confirm/:id',
      name: 'confirm-order',
      beforeEnter: admin,
      component: ProjectView
    },
    {
      path: '/admin/projekt/:id',
      name: 'admin-view-order',
      beforeEnter: admin,
      component: AdminConfirmView
    },
    {
      path: '/min-side',
      name: 'min-side',
      beforeEnter: user,
      component: DashboardView,
    },
    {
      path: '/min-side/projekt/:id',
      name: 'projekt',
      beforeEnter: user,
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
