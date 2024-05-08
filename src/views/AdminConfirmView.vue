<script setup>
import { store } from '../store/store.js'
// import OrderCard from '@/components/OrderCard.vue';
import OrderCardConfirm from '@/components/OrderCardConfirm.vue';
</script>

<template>
    <div v-if="store.role === 'Admin'" class="grid justify-center m-4 text-center">
        <h1 class="text-3xl font-semibold">
           Bestillinger
        </h1>
        <div class="mt-2">
            <p class="font-semibold text-lg">Bestillinger til bekræftelse</p>
            <div class="grid">
                <OrderCardConfirm v-for="order in store.orders" :key="order.orderId" :order="order"/>

                <!-- No orders -->
                <div v-if="store.orders.length < 1" class="bg-slate-700 rounded-xl p-8 text-white">
                    <p>Ingen bestillinger at se</p>
                </div>
            </div>
        </div>
    </div>
</template>