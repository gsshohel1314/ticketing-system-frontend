<script setup>
import { ref, onMounted } from 'vue'
import { useTicketStore } from '../stores/ticket'
import { RouterLink } from 'vue-router'

const ticketStore = useTicketStore()
const currentPage = ref(1)

onMounted(async () => {
    await ticketStore.fetchTickets(currentPage.value)
    // console.log('Tickets after fetch:', ticketStore.tickets)
})

const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this ticket?')) {
        const result = await ticketStore.deleteTicket(id)
        if (!result.success) {
            alert(result.message)
        }
    }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-4 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-7xl">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div class="mb-5 flex justify-between items-center">
          <h2 class="text-3xl font-bold text-gray-900">My Tickets</h2>
          <RouterLink :to="{ name: 'ticket-create'}" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Create Ticket
          </RouterLink>
        </div>

        <!-- Error Message -->
        <div v-if="ticketStore.errorMessage" class="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-md">
          {{ ticketStore.errorMessage }}
        </div>

        <!-- Tickets Table -->
        <div v-else-if="ticketStore.tickets.data?.length" class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <tbody class="bg-white divide-y divide-gray-200 border border-gray-200">
              <tr v-for="ticket in ticketStore.tickets.data" :key="ticket.id" class="hover:bg-slate-100 cursor-pointer transition group">
                <td class="p-4">
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
                            <h3 class="font-medium text-slate-800 truncate">{{ ticket.subject }}</h3>
                        </div>
                        <div class="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-500">
                            <span>#{{ ticket.id }}</span>
                            <span>•</span>
                            <span>{{ ticket.created_at }}</span>
                            <span>•</span>
                            <span class="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">{{ ticket.category }}</span>
                            <span class="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">{{ ticket.priority }}</span>
                            <span class="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">{{ ticket.status }}</span>
                        </div>
                        <p v-if="ticket.description" class="text-xs text-slate-600 mt-2 line-clamp-2">
                            {{ ticket.description.length > 100 ? ticket.description.slice(0, 100) + '...' : ticket.description }}
                        </p>
                    </div>
                </td>
        
                <td class="px-6 py-4 whitespace-nowrap space-x-4 text-right">
                    <RouterLink :to="{ name: 'ticket-show', params: { id: ticket.id } }"
                        class="text-white bg-green-600 hover:bg-green-700 rounded-md px-3 py-2"
                        @click="console.log('Ticket ID:', ticket.id)"
                    >
                        View
                    </RouterLink>

                    <RouterLink 
                        :to="{ name: 'ticket-edit', params: { id: ticket.id } }"
                        class="text-white bg-yellow-600 hover:bg-yellow-700 rounded-md px-3 py-2"
                        @click="console.log('Ticket ID:', ticket.id)"
                    >
                        Edit
                    </RouterLink>

                    <button @click="handleDelete(ticket.id)"
                        class="text-white bg-red-600 hover:bg-red-700 rounded-md px-3 py-1"
                    >
                        Delete
                    </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- No Tickets -->
        <div v-else class="text-center py-4 text-gray-500">
          No tickets found.
        </div>
      </div>
    </div>
  </div>
</template>