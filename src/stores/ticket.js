import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useTicketStore = defineStore('ticket', () => {
    const tickets = ref([])
    const currentTicket = ref(null)
    const errors = ref({})
    const errorMessage = ref('')
    const router = useRouter()

    // Fetch CSRF token
    async function fetchCsrfToken() {
        try {
            await axios.get('/sanctum/csrf-cookie')
        } catch (error) {
            console.error('Failed to fetch CSRF token', error)
        }
    }

    // Fetch all tickets (Index)
    async function fetchTickets(page = 1) {
        errors.value = {}
        errorMessage.value = ''
        try {
            const res = await axios.get(`/api/v1/tickets?page=${page}`)
            tickets.value = res.data.data
            return { success: true, data: res.data }
        } catch (error) {
            const data = error.response?.data
            errorMessage.value = data?.message
            errors.value = data?.errors
            return { success: false, message: errorMessage.value }
        }
    }

    // Fetch single ticket (Show)
    async function fetchTicket(id) {
        errors.value = {}
        errorMessage.value = ''
        try {
            const res = await axios.get(`/api/v1/tickets/${id}`)            
            currentTicket.value = res.data.data
            return { success: true, data: res.data.data }
        } catch (error) {
            const status = error.response?.status
            const data = error.response?.data
            if (status === 404) {
                errorMessage.value = "Data not found"
                errors.value = data?.errors
            } else if (status === 500) {
                errorMessage.value = data?.message
                errors.value = data?.errors
            }
            return { success: false, message: errorMessage.value }
        }
    }

    // Create ticket (Store)
    async function createTicket(formData) {
        errors.value = {}
        errorMessage.value = ''
        try {
            await fetchCsrfToken()
            const res = await axios.post('/api/v1/tickets', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })            
            router.push({ name: 'tickets' })
            return { success: true, message: res.data.message }
        } catch (error) {
            const status = error.response?.status
            const data = error.response?.data
            errorMessage.value = data?.message || 'Failed to create ticket'
            errors.value = data?.errors || {}
            return { success: false, message: errorMessage.value, errors: errors.value }
        }
    }

    // Update ticket (Update)
    async function updateTicket(id, formData) {        
        errors.value = {}
        errorMessage.value = ''
        try {
            await fetchCsrfToken()
            const res = await axios.post(`/api/v1/tickets/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            currentTicket.value = res.data.data
            router.push({ name: 'tickets' })
            return { success: true, message: res.data.message }
        } catch (error) {            
            const status = error.response?.status
            const data = error.response?.data
            errorMessage.value = data?.message || 'Failed to update ticket'
            errors.value = data?.errors || {}
            return { success: false, message: errorMessage.value, errors: errors.value }
        }
    }

    // Delete ticket (Destroy)
    async function deleteTicket(id) {
        errors.value = {}
        errorMessage.value = ''
        try {
            await fetchCsrfToken()
            const res = await axios.delete(`/api/v1/tickets/${id}`)
            tickets.value.data = tickets.value.data.filter(ticket => ticket.id !== id)
            router.push({ name: 'tickets' })
            return { success: true, message: res.data.message }
        } catch (error) {
            const data = error.response?.data
            errorMessage.value = data?.message
            errors.value = data?.errors
            return { success: false, message: errorMessage.value }
        }
    }

    return { tickets, currentTicket, errors, errorMessage, fetchTickets, fetchTicket, createTicket, updateTicket, deleteTicket }
})