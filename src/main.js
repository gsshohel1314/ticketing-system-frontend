import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import axios from 'axios'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import './style.css'

// Set base URL dynamically
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL // API endpoint
axios.defaults.withCredentials = true

// Configure Laravel Echo with Pusher
// For private channel
window.Pusher = Pusher;
window.Pusher.logToConsole = true; // for console debug
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true,
    authEndpoint: `${import.meta.env.VITE_API_BASE_URL}/api/v1/pusher/auth`,
    auth: {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
    },
});

// For public channel
// window.Pusher = Pusher;
// window.Pusher.logToConsole = true; // for console debug
// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: import.meta.env.VITE_PUSHER_APP_KEY,
//     cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
//     forceTLS: true,
// });

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
