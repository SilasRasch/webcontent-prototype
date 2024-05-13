<script setup>
import { store } from '@/store/store';
import OrderCardMini from './OrderCardMini.vue';

const props = defineProps({
    admin: {
        type: Boolean,
        required: false
    }
})

const confirmedOrders = store.orders.filter(i => i.isConfirmed && !i.isComplete && !i.isDenied)
const queued = confirmedOrders.filter((i) => i.isConfirmed === true && i.status === 1)
const planned = confirmedOrders.filter((i) => i.isConfirmed === true && i.status === 2)
const production = confirmedOrders.filter((i) => i.isConfirmed === true && i.status === 3)
const feedback = confirmedOrders.filter((i) => i.isConfirmed === true && i.status === 4)
</script>

<template>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-2 p-2 rounded-xl mt-0 w-[90vw]">
        <!-- Queued -->
        <div class="flex flex-col gap-2">
            <h3 class="text-xl font-semibold p-1 m-0 bg-slate-800 text-white rounded-xl">I kø</h3>
            <hr class="text-white rounded-full opacity-80 h-1 mx-0.5 border-none bg-red-400" />
            <OrderCardMini v-for="index in queued" :key="index" :order-id="index.orderId" :brand="index.brand" :admin="props.admin">{{ index.projectName }}</OrderCardMini>
        </div>

        <!-- Planned -->
        <div class="flex flex-col gap-2">
            <h3 class="text-xl font-semibold p-1 m-0 bg-slate-800 text-white rounded-xl">Planlægning</h3>
            <hr class="text-white bg-yellow-500 rounded-full opacity-80 h-1 mx-0.5 border-none" />
            <OrderCardMini v-for="index in planned" :key="index" :order-id="index.orderId" :brand="index.brand" :admin="props.admin" color-class="bg-yellow-500">{{ index.projectName }}</OrderCardMini>
        </div>

        <!-- In production -->
        <div class="flex flex-col gap-2">
            <h3 class="text-xl font-semibold p-1 m-0 bg-slate-800 text-white rounded-xl">Igangværende</h3>
            <hr class="text-white bg-blue-500 rounded-full opacity-80 h-1 mx-0.5 border-none" />
            <OrderCardMini v-for="index in production" :key="index" :order-id="index.orderId" :brand="index.brand" :admin="props.admin" color-class="bg-blue-500">{{ index.projectName }}</OrderCardMini>
        </div>

        <!-- Feedback -->
        <div class="flex flex-col gap-2">
            <h3 class="text-xl font-semibold p-1 m-0 bg-slate-800 text-white rounded-xl">Feedback</h3>
            <hr class="text-white bg-green-500 rounded-full opacity-80 h-1 mx-0.5 border-none" />
            <OrderCardMini v-for="index in feedback" :key="index" :order-id="index.orderId" :brand="index.brand" :admin="props.admin" color-class="bg-green-500">{{ index.projectName }}</OrderCardMini>
        </div>
    </div>
</template>