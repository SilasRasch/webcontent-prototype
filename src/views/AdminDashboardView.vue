<script setup>
import { store } from '@/store/store';
import AdminDashboard from '@/components/admin/AdminDashboard.vue';
</script>

<template>
    <div class="grid justify-center text-center m-4">
        <h1 class="text-3xl font-semibold">Kontrolpanel</h1>

        <hr class="text-black bg-black opacity-50 h-0.5 m-3 mb-1" />

        <div v-if="store.role === 'Admin'">
            <h1 class="text-xl font-semibold m-2">
                Bestillinger
            </h1>

        <!-- Mine bestillinger (Normal bruger) -->
            <AdminDashboard />
        </div>
        
        <div v-else>Du har ikke adgang til denne side..</div>
    </div>    
</template>

