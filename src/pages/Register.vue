<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <div class="mb-5">
                    <h2 class="text-3xl font-bold text-gray-900">Sign up</h2>
                    <p class="mt-2 text-sm font-medium text-gray-600">
                        Enter your information to sign up!
                    </p>
                </div>

                <form class="space-y-6" action="#" method="POST">
                    <div class="grid grid-cols-1 gap-2">
                        <label class="block text-sm font-medium text-gray-700">Name</label>
                        <div>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="John Doe"
                            />
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-2">
                        <label class="block text-sm font-medium text-gray-700">Email</label>
                        <div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="example@gmail.com"
                            />
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-2">
                        <label class="block text-sm font-medium text-gray-700">Password</label>
                        <div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="********"
                            />
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-2">
                        <label class="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <div>
                            <input
                                id="password_confirmation"
                                name="password_confirmation"
                                type="password"
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="********"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
                        >
                            Sign up
                        </button>
                    </div>
                </form>

                <div class="mt-5">
                    <p class="text-sm font-medium text-gray-700">
                        Already have an account?
                        <RouterLink to="/" class="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign in
                        </RouterLink>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>