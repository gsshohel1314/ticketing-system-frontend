<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router';
import Navbar from "@/components/Navbar.vue";
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()

onMounted(() => {
    authStore.loadAuth() // Load auth state from localStorage
})
</script>

<template>
    <div class="h-screen flex flex-col">
        <Navbar v-if="$route.meta.requiresAuth"/>
        <RouterView />
    </div>
</template>
