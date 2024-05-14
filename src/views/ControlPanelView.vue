<script setup>
import { auth } from '@/store/auth';
</script>

<template>
    <div class="grid justify-center m-4 text-center">
        <h1 class="text-3xl font-semibold">
           Kontrolpanel (debug) 
        </h1>
        <div class="bg-slate-600 rounded-lg text-center m-4 p-4 text-white w-[50vw]">
            <p class="font-semibold">Vælg rolle</p>
            <select class="bg-slate-800 bg-opacity-50 p-2 rounded-lg hover:bg-opacity-75 duration-200" v-model="auth.loggedInUser.role">
                <option class="role-option">Bruger</option>
                <option class="role-option">Creator</option>
                <option class="role-option">Admin</option>
            </select>
        </div>
        
    </div>
</template>

<style scoped>
.role-option {
    @apply bg-slate-800 bg-opacity-50
}
</style>