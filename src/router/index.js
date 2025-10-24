import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import Ticket from '@/pages/Ticket.vue'
import TicketList from '@/pages/TicketList.vue'
import TicketEdit from '@/pages/TicketForm.vue'
import TicketCreate from '@/pages/TicketForm.vue'
import TicketShow from '@/pages/TicketView.vue'
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
    // {
    //     path: '/tickets',
    //     name: 'tickets',
    //     component: Ticket,
    //     meta: { requiresAuth: true }
    // },
    {
        path: '/tickets',
        name: 'tickets',
        component: TicketList,
        meta: { requiresAuth: true }
    },
    {
        path: '/tickets/create',
        name: 'ticket-create',
        component: TicketCreate,
        meta: { requiresAuth: true }
    },
    {
        path: '/tickets/:id/edit',
        name: 'ticket-edit',
        component: TicketEdit,
        meta: { requiresAuth: true }
    },
    {
        path: '/tickets/:id/show',
        name: 'ticket-show',
        component: TicketShow,
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
    routes
})

// Global guard for authentication check
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    // Check user is authenticate or not (return true/false)
    const isLoggedIn = !!authStore.token;
    
    // console.log('isLoggedIn', isLoggedIn);
    // console.log('requiresGuest', to.meta.requiresGuest);
    // console.log('requiresAuth', to.meta.requiresAuth);
    
    // Redirect authenticate page, If user is logged in and requested page is guest page. 
    if (isLoggedIn == true && to.meta.requiresGuest == true) {
        return next({ name: 'tickets' })
    }

    // Redirect guest page, If user is not logged in and requested page is authenticate page. 
    if (isLoggedIn == false && to.meta.requiresAuth == true) {
        return next({ name: 'login' })
    }

    next()
})

export default router