<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const errorMessage = ref('')

async function handleLogout() {
  errorMessage.value = ''
  const result = await authStore.logout()
  if (!result.success) {
    errorMessage.value = result.message
  }
}
</script>

<template>
  <nav class="bg-green-700 border-b border-green-500">
    <div class="mx-auto max-w-7xl">
      <div class="flex h-15 items-center justify-between">
        <div
          class="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
        >
          <a class="flex shrink-0 items-center" href="index.html">
            <span class="hidden md:block text-white text-2xl font-bold"
              >Support Ticketing System</span
            >
          </a>
          <div class="md:ml-auto">
            <div class="flex space-x-2 items-center">
              <div v-if="authStore.user" class="text-white">
                <span>{{ authStore.user.name }}</span>
                <span class="ml-2">({{ authStore.user.role }})</span>
              </div>

              <button
                @click="handleLogout"
                class="text-white hover:bg-green-800 hover:text-white rounded-md px-3 py-2"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
