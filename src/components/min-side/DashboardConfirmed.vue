<script setup>
import { store } from '@/store/store';
import OrderCardMini from './OrderCardMini.vue';

const arr = [1,2,3,4]

const queued = store.orders.filter((i) => i.isConfirmed == true)
</script>

<template>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-2 p-2 rounded-xl mt-0 w-[90vw]">
        <!-- Column 1 -->
        <div class="flex flex-col gap-2">
            <h3 class="text-xl font-semibold p-1 m-0 bg-slate-800 text-white rounded-xl">I kø</h3>
            <hr class="text-white rounded-full opacity-80 h-1 mx-0.5 border-none bg-red-400" />
            <OrderCardMini v-for="index in queued" :key="index" :order-id="index.orderId" :brand="index.brand">{{ index.projectName }}</OrderCardMini>
        </div>

        <!-- Column 2 -->
        <div class="flex flex-col gap-2">
            <h3 class="text-xl font-semibold p-1 m-0 bg-slate-800 text-white rounded-xl">Planlægning</h3>
            <hr class="text-white bg-yellow-500 rounded-full opacity-80 h-1 mx-0.5 border-none" />
            <OrderCardMini v-for="index in arr" :key="index" :order-id="index" brand="Brand" color-class="bg-yellow-500">Projektnavn</OrderCardMini>
        </div>

        <!-- Column 3 -->
        <div class="flex flex-col gap-2">
            <h3 class="text-xl font-semibold p-1 m-0 bg-slate-800 text-white rounded-xl">Igangværende</h3>
            <hr class="text-white bg-blue-500 rounded-full opacity-80 h-1 mx-0.5 border-none" />
            <OrderCardMini v-for="index in arr" :key="index" :order-id="index" brand="Brand" color-class="bg-blue-500">Projektnavn</OrderCardMini>
        </div>

        <!-- Column 4 -->
        <div class="flex flex-col gap-2">
            <h3 class="text-xl font-semibold p-1 m-0 bg-slate-800 text-white rounded-xl">Feedback</h3>
            <hr class="text-white bg-green-500 rounded-full opacity-80 h-1 mx-0.5 border-none" />
            <OrderCardMini v-for="index in arr" :key="index" :order-id="index" brand="Brand" color-class="bg-green-500">Projektnavn</OrderCardMini>
        </div>
    </div>
</template>