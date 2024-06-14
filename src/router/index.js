import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OrderView from'../views/OrderView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProjectView from '../views/ProjectView.vue'
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

const authenticate = () => {
  auth.refreshToken()
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
      beforeEnter: authenticate,
      component: HomeView
    },
    {
      path: '/privatlivspolitik',
      name: 'privacy-policy',
      beforeEnter: authenticate,
      component: () => import('../views/legal/PrivacyPolicy.vue')
    },
    {
      path: '/vilkår',
      name: 'terms',
      beforeEnter: authenticate,
      component: () => import('../views/legal/TermsOfService.vue')
    },
    {
      path: '/cookiepolitik',
      name: 'cookie-policy',
      beforeEnter: authenticate,
      component: () => import('../views/legal/CookiePolicy.vue')
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
  ]
})

router.beforeEach((to, from, next) => {
  auth.refreshToken().then(() => {
    next()
  })
})

export default router
