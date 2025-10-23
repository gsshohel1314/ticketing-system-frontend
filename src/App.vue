<script setup>
import { RouterView } from 'vue-router';
import Navbar from "@/components/Navbar.vue";
</script>

<template>
    <div class="h-screen flex flex-col">
        <Navbar v-if="$route.meta.requiresAuth"/>
        <RouterView />
    </div>
</template>
