<script setup>
import { onMounted } from 'vue'
import { useTicketStore } from '../stores/ticket'
import { useRoute, RouterLink } from 'vue-router'

const ticketStore = useTicketStore()
const route = useRoute()

onMounted(() => {
  ticketStore.fetchTicket(route.params.id)
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-4xl">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div class="mb-5 flex justify-between items-center">
          <h2 class="text-3xl font-bold text-gray-900">Ticket Details</h2>
          <div class="flex justify-between items-center space-x-2">
              <RouterLink :to="{ name: 'ticket-edit', params: { id: route.params.id } }" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Edit Ticket
              </RouterLink>
               <RouterLink
                    :to="{name: 'tickets'}"
                    class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                    Back to list
                </RouterLink>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="ticketStore.errorMessage" class="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-md">
          {{ ticketStore.errorMessage }}
        </div>

        <!-- Loading State -->
        <div v-if="ticketStore.loading" class="text-center py-4">
          Loading...
        </div>

        <!-- Ticket Details -->
        <div v-else-if="ticketStore.currentTicket" class="space-y-4">
          <div>
            <h3 class="text-lg font-medium text-gray-900">Subject</h3>
            <p class="text-gray-600">{{ ticketStore.currentTicket.subject }}</p>
          </div>
          <div>
            <h3 class="text-lg font-medium text-gray-900">Description</h3>
            <p class="text-gray-600">{{ ticketStore.currentTicket.description || 'N/A' }}</p>
          </div>
          <div>
            <h3 class="text-lg font-medium text-gray-900">Category</h3>
            <p class="text-gray-600">{{ ticketStore.currentTicket.category }}</p>
          </div>
          <div>
            <h3 class="text-lg font-medium text-gray-900">Priority</h3>
            <p class="text-gray-600">{{ ticketStore.currentTicket.priority }}</p>
          </div>
          <div>
            <h3 class="text-lg font-medium text-gray-900">Status</h3>
            <p class="text-gray-600">{{ ticketStore.currentTicket.status }}</p>
          </div>
          <div v-if="ticketStore.currentTicket.attachment">
            <h3 class="text-lg font-medium text-gray-900">Attachment</h3>
            <a :href="ticketStore.currentTicket.attachment" target="_blank" class="text-indigo-600 hover:text-indigo-900">
              View Attachment
            </a>
          </div>
          <div v-if="ticketStore.currentTicket.comments?.length">
            <h3 class="text-lg font-medium text-gray-900">Comments</h3>
            <ul class="space-y-2">
              <li v-for="comment in ticketStore.currentTicket.comments" :key="comment.id" class="text-gray-600">
                {{ comment.body }} (by {{ comment.user_id }} at {{ comment.created_at }})
              </li>
            </ul>
          </div>
        </div>

        <!-- No Ticket -->
        <div v-else class="text-center py-4 text-gray-500">
          Ticket not found.
        </div>
      </div>
    </div>
  </div>
</template>