<script setup>
import OrderCardMini from './OrderCardMini.vue';

const arr = [1,2,3,4]
</script>

<template>
    <!-- Dashboard -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-2 p-2 rounded-xl mt-0 w-[90vw]">
        <!-- Column 1 -->
        <div class="grid gap-2">
            <h3 class="text-xl font-semibold p-1 m-0 bg-red-500 text-white rounded-xl">I kø</h3>
            <hr class="text-white bg-white rounded-full opacity-50 h-1 mx-0.5 border-none" />
            <OrderCardMini v-for="index in arr" :key="index" brand="Brand">Projektnavn</OrderCardMini>
        </div>

        <!-- Column 2 -->
        <div class="grid gap-2">
            <h3 class="text-xl font-semibold p-1 m-0 bg-red-500 text-white rounded-xl">Planlægning</h3>
            <hr class="text-white bg-white rounded-full opacity-50 h-1 mx-0.5 border-none" />
            <OrderCardMini v-for="index in arr" :key="index" brand="Brand">Projektnavn</OrderCardMini>
        </div>

        <!-- Column 3 -->
        <div class="grid gap-2">
            <h3 class="text-xl font-semibold p-1 m-0 bg-red-500 text-white rounded-xl">Igangværende</h3>
            <hr class="text-white bg-white rounded-full opacity-50 h-1 mx-0.5 border-none" />
            <OrderCardMini v-for="index in arr" :key="index" brand="Brand">Projektnavn</OrderCardMini>
        </div>

        <!-- Column 4 -->
        <div class="grid gap-2">
            <h3 class="text-xl font-semibold p-1 m-0 bg-red-500 text-white rounded-xl">Feedback</h3>
            <hr class="text-white bg-white rounded-full opacity-50 h-1 mx-0.5 border-none" />
            <OrderCardMini v-for="index in arr" :key="index" brand="Brand">Projektnavn</OrderCardMini>
        </div>
        
    </div>
</template>