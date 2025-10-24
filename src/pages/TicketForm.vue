<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTicketStore } from '../stores/ticket'
import { useRoute, useRouter } from 'vue-router'

const ticketStore = useTicketStore()
const route = useRoute()
const router = useRouter()
const isEdit = computed(() => !!route.params.id)

const form = ref({
  subject: '',
  description: '',
  category: '',
  priority: '',
  status: '',
  attachment: null
})

const categories = ['technical', 'billing', 'others']
const priorities = ['low', 'medium', 'high']
const statuses = ['open', 'in_progress', 'resolved', 'closed']

onMounted(async () => {
  if (isEdit.value) {
    const result = await ticketStore.fetchTicket(route.params.id)
    
    if (result.success) {
      form.value = {
        subject: ticketStore.currentTicket.subject,
        description: ticketStore.currentTicket.description || '',
        category: ticketStore.currentTicket.category,
        priority: ticketStore.currentTicket.priority,
        status: ticketStore.currentTicket.status,
        attachment: null,
        currentAttachment: ticketStore.currentTicket.attachment
          ? {
              name: ticketStore.currentTicket.attachment.split('/').pop(), // file name
              url: ticketStore.currentTicket.attachment // file URL
            }
          : null
      }
    }
  }
})

const handleSubmit = async () => {
  const formData = new FormData()
  formData.append('subject', form.value.subject)
  formData.append('description', form.value.description)
  formData.append('category', form.value.category)
  formData.append('priority', form.value.priority)
  formData.append('status', form.value.status)
  if (form.value.attachment) {
    formData.append('attachment', form.value.attachment)
  }
  if (isEdit.value) {
    formData.append('_method', 'PUT')
  }

  const result = isEdit.value
    ? await ticketStore.updateTicket(route.params.id, formData)
    : await ticketStore.createTicket(formData)

//   if (!result.success) {
//     alert(result.message)
//   }
}
</script>

<template>
  <div class="flex flex-col justify-center py-4 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-4xl">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div class="mb-5 flex items-center justify-between">
            <h2 class="text-3xl font-bold text-gray-900">{{ isEdit ? 'Edit Ticket' : 'Create Ticket' }}</h2>
            <RouterLink
                :to="{name: 'tickets'}"
                class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
                Back to list
            </RouterLink>
        </div>

        <!-- Error Message -->
        <div v-if="ticketStore.errorMessage" class="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-md">
          {{ ticketStore.errorMessage }}
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-1 gap-2">
            <label class="block text-sm font-medium text-gray-700">Subject</label>
            <input
              v-model="form.subject"
              type="text"
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter subject"
            />
            <p v-if="ticketStore.errors.subject" class="mt-1 text-xs text-red-600">{{ ticketStore.errors.subject[0] }}</p>
          </div>

          <div class="grid grid-cols-1 gap-2">
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              v-model="form.description"
              rows="3"
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter description"
            ></textarea>
            <p v-if="ticketStore.errors.description" class="mt-1 text-xs text-red-600">{{ ticketStore.errors.description[0] }}</p>
          </div>

          <div class="grid grid-cols-1 gap-2">
            <label class="block text-sm font-medium text-gray-700">Category</label>
            <select
              v-model="form.category"
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select category</option>
              <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
            </select>
            <p v-if="ticketStore.errors.category" class="mt-1 text-xs text-red-600">{{ ticketStore.errors.category[0] }}</p>
          </div>

          <div class="grid grid-cols-1 gap-2">
            <label class="block text-sm font-medium text-gray-700">Priority</label>
            <select
              v-model="form.priority"
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select priority</option>
              <option v-for="priority in priorities" :key="priority" :value="priority">{{ priority }}</option>
            </select>
            <p v-if="ticketStore.errors.priority" class="mt-1 text-xs text-red-600">{{ ticketStore.errors.priority[0] }}</p>
          </div>

          <div class="grid grid-cols-1 gap-2">
            <label class="block text-sm font-medium text-gray-700">Status</label>
            <select
              v-model="form.status"
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
                <option value="">Select status</option>
              <option v-for="status in statuses" :key="status" :value="status">{{ status }}</option>
            </select>
            <p v-if="ticketStore.errors.status" class="mt-1 text-xs text-red-600">{{ ticketStore.errors.status[0] }}</p>
          </div>

          <div class="grid grid-cols-1 gap-2">
            <label class="block text-sm font-medium text-gray-700">Attachment</label>
            <input
              type="file"
              @change="form.attachment = $event.target.files[0]"
              class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            <!-- Show current file -->
            <div v-if="form.currentAttachment" class="mt-2 text-sm text-gray-600">
                <a :href="form.currentAttachment.url" target="_blank" class="text-indigo-600 hover:text-indigo-900">
                {{ form.currentAttachment.name }}
                </a>
            </div>
            <p v-if="ticketStore.errors.attachment" class="mt-1 text-xs text-red-600">{{ ticketStore.errors.attachment[0] }}</p>
          </div>

          <div>
            <button
              type="submit"
              :disabled="ticketStore.loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition disabled:opacity-50"
            >
              <span v-if="ticketStore.loading">{{ isEdit ? 'Updating...' : 'Creating...' }}</span>
              <span v-else>{{ isEdit ? 'Update Ticket' : 'Create Ticket' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>