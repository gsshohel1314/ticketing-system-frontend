import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const token = ref(null)
    const router = useRouter()

    async function fetchCsrfToken() {
        await axios.get('/sanctum/csrf-cookie')
    }

    async function login(credentials) {
        try {
            await fetchCsrfToken() // Fetch CSRF token before API call
            const res = await axios.post('/api/v1/login', credentials) 
            user.value = res.data.data.user
            token.value = res.data.data.token
            localStorage.setItem('auth_token', token.value)
            localStorage.setItem('user', JSON.stringify(user.value))
            axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
            router.push('/tickets')
            return { success: true, message: res.data.message }
        } catch (error) {
            const status = error.response?.status
            const data = error.response?.data
            let errors = {}
            let message = 'Login failed'

            if (status === 422) {
                message = data.message
                errors = data.errors
            } else if (status === 401) {
                message = data.message
            } else if (status === 500) {
                message = data.message
                errors = data.errors
            }

            return { success: false, errors, message }
        }
    }

    async function register(data) {
        try {
            await fetchCsrfToken() // Fetch CSRF token before API call
            const res = await axios.post('/api/v1/register', data)            
            user.value = res.data.data.user
            token.value = res.data.data.token
            localStorage.setItem('auth_token', token.value)
            localStorage.setItem('user', JSON.stringify(user.value))
            axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
            router.push('/tickets')
            return { success: true, message: res.data.message }
        } catch (error) {
            const status = error.response?.status
            const data = error.response?.data
            let errors = {}
            let message = 'Registration failed'

            if (status === 422) {
                errors = data.errors
                message = data.message
            } else if (status === 500) {
                message = data.message
                errors = data.errors
            }

            return { success: false, errors, message }
        }
    }

    async function logout() {
        try {
            await fetchCsrfToken() // Fetch CSRF token before API call
            await axios.post('/api/v1/logout')
            user.value = null
            token.value = null
            localStorage.removeItem('auth_token')
            localStorage.removeItem('user')
            delete axios.defaults.headers.common['Authorization']
            router.push('/')
            return { success: true, message: 'Logged out successfully' }
        } catch (error) {
            const status = error.response?.status
            const data = error.response?.data
            let message = 'Logout failed'

            if (status === 401) {
                message = 'Unauthorized, please log in again'
            } else if (status === 500) {
                message = data?.message || 'Server error'
            }

            return { success: false, message }
        }
    }

    function loadAuth() {
        const storedToken = localStorage.getItem('auth_token')
        const storedUser = localStorage.getItem('user')
        if (storedToken && storedUser) {
            token.value = storedToken
            user.value = JSON.parse(storedUser)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
        }
    }

    return { user, token, login, register, logout, loadAuth }
})