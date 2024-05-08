<script setup>
import { store } from '../store/store.js'
import { RouterLink } from 'vue-router'
import OrderCard from '@/components/OrderCard.vue';
</script>

<template>
    <div class="grid justify-center text-center m-4">
        <h1 class="text-3xl font-semibold">
           Min Side 
        </h1>
        
        <!-- Mine bestillinger (Normal bruger) -->
        <div class="mt-2" v-if="store.role === 'Bruger'">
            <p class="font-semibold text-lg">Mine bestillinger</p>
            <div class="grid">
                <OrderCard v-for="order in store.orders" :key="order.orderId" :order="order"/>

                <!-- No orders -->
                <div v-if="store.orders.length < 1" class="bg-slate-700 rounded-xl p-8 text-white">
                    <p>Ingen bestillinger at se</p>
                    <RouterLink class="underline text-blue-600 font-semibold" to="/bestil">Gå til bestilling</RouterLink>
                </div>
            </div>
            
        </div>
    </div>
</template>