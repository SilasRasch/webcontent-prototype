import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OrderView from'../views/OrderView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProjectView from '../views/ProjectView.vue'
import CreateUser from '../views/CreateUser.vue'
import { auth } from '@/store/auth'

// Navigation guards

const user = () => {
  if (!auth.isLoggedIn && !auth.isUser()) {
    return "/"
  }
}

const creator = () => {
  if (!auth.isLoggedIn && !auth.isCreator()) {
    return "/"
  }
}

const admin = () => {
  if (!auth.isLoggedIn && !auth.isAdmin()) {
    return "/"
  }
}

// const guest = () => {
//   if (auth.isLoggedIn) {
//     return "/"
//   }
// }

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
      component: ProjectView
    },
    {
      path: '/min-side',
      name: 'min-side',
      beforeEnter: [user, creator],
      component: DashboardView,
    },
    {
      path: '/min-side/projekt/:id',
      name: 'projekt',
      beforeEnter: [user, creator],
      component: ProjectView,
    },
    {
      path: '/opret',
      name: 'create-user',
      beforeEnter: admin,
      component: CreateUser,
    },
  ]
})

router.beforeEach((to, from) => {
  auth.refreshToken()
})

export default router
