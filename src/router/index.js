import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import Ticket from '@/pages/Ticket.vue'
import NotFound from '@/pages/NotFound.vue'

const routes = [
    {
        path: '/',
        name: 'login',
        component: Login,
        meta: { requiresGuest: true }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: { requiresGuest: true }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Ticket,
        meta: { requiresAuth: true }
    },
    // 404 page (put it last)
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound
    }
]

// Create router
const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { top: 0 }
    }
})

// // Global guard for authentication check
// router.beforeEach((to, from, next) => {
//     // Check user is authenticate or not (return true/false)
//     const isLoggedIn = !!localStorage.getItem('auth-token')

//     // Redirect authenticate user from guest page to protected page
//     if (to.meta.requiresGuest && isLoggedIn) {
//         return next({ name: 'dashboard' })
//     }

//     // Redirect authenticate user from protected page to guest page
//     if (to.meta.requiresAuth && !isLoggedIn) {
//         return next({ name: 'login' })
//     }

//     next()
// })

export default router