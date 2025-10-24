<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router';
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const form = ref({
    email: '',
    password: ''
})
const errors = ref({})
const errorMessage = ref('')

async function handleLogin() {
    errors.value = {}
    errorMessage.value = ''
    const result = await authStore.login(form.value)
    if (!result.success) {
        errors.value = result.errors
        errorMessage.value = result.message
    }
}
</script>

<template>
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <div class="mb-5">
                    <h2 class="text-3xl font-bold text-gray-900">Sign in</h2>
                    <p class="mt-2 text-sm font-medium text-gray-600">
                        Enter your email and password to sign in!
                    </p>
                </div>

                 <!-- General Error Message -->
                <div v-if="errorMessage" class="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-md">
                    {{ errorMessage }}
                </div>

                <form @submit.prevent="handleLogin" class="space-y-6">
                    <div class="grid grid-cols-1 gap-2">
                        <label class="block text-sm font-medium text-gray-700">Email</label>
                        <div>
                            <input
                                id="email"
                                v-model="form.email"
                                type="email"
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="example@gmail.com"
                            />
                            <p v-if="errors.email" class="mt-1 text-xs text-red-600">{{ errors.email[0] }}</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-2">
                        <label class="block text-sm font-medium text-gray-700">Password</label>
                        <div>
                            <input
                                id="password"
                                v-model="form.password"
                                type="password"
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="********"
                            />
                            <p v-if="errors.password" class="mt-1 text-xs text-red-600">{{ errors.password[0] }}</p>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <div class="mt-5">
                    <p class="text-sm font-medium text-gray-700">
                        Don't have an account?
                        <RouterLink to="/register" class="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign Up
                        </RouterLink>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>