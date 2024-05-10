<script setup>
import MyDashboard from '@/components/min-side/MyDashboard.vue';
</script>

<template>

    <div class="grid justify-center text-center m-4">
        <h1 class="text-3xl font-semibold">
           Min Side 
        </h1>

        <hr class="text-black bg-black opacity-50 h-0.5 m-3 mb-1" />

        <h1 class="text-xl font-semibold m-2">
           Mine bestillinger
        </h1>
    </div>    
        <!-- Mine bestillinger (Normal bruger) -->
        <MyDashboard />
</template>

