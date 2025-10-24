<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useTicketStore } from '../stores/ticket'
import { useRoute, RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const ticketStore = useTicketStore()
const authStore = useAuthStore()
const route = useRoute()
const activeTab = ref('comments')
const newComment = ref('')
const newChat = ref('')

onMounted(async () => {
  await ticketStore.fetchTicket(route.params.id)
//   ticketStore.subscribeToChat(route.params.id)
})

// onUnmounted(() => {
//   ticketStore.unsubscribeFromChat(route.params.id)
// })

async function handleAddComment() {
  if (newComment.value.trim()) {
    const result = await ticketStore.addComment(route.params.id, newComment.value)
    if (result.success) {
      newComment.value = ''
    } else {
      alert(result.message)
    }
  }
}

async function handleSendChat() {
  if (newChat.value.trim()) {
    const result = await ticketStore.sendChat(route.params.id, newChat.value)
    if (result.success) {
      newChat.value = ''
    } else {
      alert(result.message)
    }
  }
}
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
                <p class="text-gray-800 font-bold text-xl">{{ ticketStore.currentTicket.subject }}</p>
                <p class="text-gray-600 text-sm font-medium">{{ ticketStore.currentTicket.description || 'N/A' }}</p>
            </div>
            <div class="flex space-x-5">
                <p class="text-gray-600 text-sm font-medium"><span class="font-bold">Category: </span>{{ ticketStore.currentTicket.category }}</p>
                <p class="text-gray-600 text-sm font-medium"><span class="font-bold">Priority: </span>{{ ticketStore.currentTicket.priority }}</p>
                <p class="text-gray-600 text-sm font-medium"><span class="font-bold">Status: </span>{{ ticketStore.currentTicket.status }}</p>
            </div>
            <div v-if="ticketStore.currentTicket.attachment">
                <a :href="ticketStore.currentTicket.attachment" target="_blank" class="text-indigo-600 hover:text-indigo-900">
                    View Attachment
                </a>
            </div>

          <!-- Tabs for Comments and Chat -->
          <div class="border-b border-gray-200">
            <nav class="-mb-px flex space-x-8">
              <button
                @click="activeTab = 'comments'"
                :class="[
                  activeTab === 'comments'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                ]"
              >
                Comments
              </button>
              <button
                @click="activeTab = 'chat'"
                :class="[
                  activeTab === 'chat'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                ]"
              >
                Chat
              </button>
            </nav>
          </div>

          <!-- Comments Section -->
          <div v-if="activeTab === 'comments'" class="mt-4">
            <h3 class="text-lg font-medium text-gray-900">Comments</h3>
            <div class="h-64 overflow-y-auto border border-gray-300 rounded-md p-4">
                <div v-if="ticketStore.currentTicket.comments?.length" class="space-y-4 mt-2">
                  <div v-for="comment in ticketStore.currentTicket.comments" :key="comment.id" class="border-l-4 border-indigo-500 pl-4 py-2">
                    <p class="text-gray-600 text-sm">{{ comment.comment }}</p>
                    <p class="text-xs text-gray-500">By {{ comment.user?.name }} at {{ comment.created_at }}</p>
                  </div>
                </div>
                <div v-else class="text-gray-500 text-center py-2">
                  No comments yet.
                </div>
            </div>

            <!-- Add Comment Form -->
            <div class="mt-4 flex justify-between space-x-2">
              <textarea
                v-model="newComment"
                placeholder="Add a comment..."
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
              <p v-if="ticketStore.errors.comment" class="mt-1 text-xs text-red-600">{{ ticketStore.errors.comment[0] }}</p>
              <button
                @click="handleAddComment"
                :disabled="ticketStore.loading || !newComment.trim()"
                class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                <span v-if="ticketStore.loading">Adding...</span>
                <span v-else>Add Comment</span>
              </button>
            </div>
          </div>

          <!-- Chat Section -->
          <div v-if="activeTab === 'chat'" class="mt-4">
            <h3 class="text-lg font-medium text-gray-900">Chat</h3>
            <div class="h-64 overflow-y-auto border border-gray-300 rounded-md p-4">
              <div v-if="ticketStore.currentTicket.chats?.length" class="space-y-4">
                <div v-for="chat in ticketStore.currentTicket.chats" :key="chat.id" :class="['flex', chat.sender.id === authStore.user?.id ? 'justify-end' : 'justify-start']">
                  <div :class="['max-w-xs p-3 rounded-lg', chat.sender.id === authStore.user?.id ? 'bg-indigo-100 text-indigo-900' : 'bg-gray-100 text-gray-900']">
                    <p class="text-sm">{{ chat.message }}</p>
                    <p class="text-xs text-gray-500">{{ chat.created_at }}</p>
                  </div>
                </div>
              </div>
              <div v-else class="text-gray-500 text-center py-2">
                No chats yet.
              </div>
            </div>

            <!-- Send Chat Form -->
            <div class="mt-4 flex space-x-2">
              <input
                v-model="newChat"
                placeholder="Type a message..."
                class="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                @keyup.enter="handleSendChat"
              />
              <button
                @click="handleSendChat"
                :disabled="ticketStore.loading || !newChat.trim()"
                class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                <span v-if="ticketStore.loading">Sending...</span>
                <span v-else>Send</span>
              </button>
            </div>
            <p v-if="ticketStore.errors.message" class="mt-1 text-xs text-red-600">{{ ticketStore.errors.message[0] }}</p>
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