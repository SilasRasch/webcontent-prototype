<script setup>
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { store } from '@/store/store';
import OrderCard from '@/components/min-side/OrderCard.vue';

const route = useRoute()
const router = useRouter()

const paramId = ref(route.params.id)
const order = ref(store.newOrder)

onBeforeRouteUpdate(async (to) => {
    // paramId.value = await fetchOrder(to.params.id)
    paramId.value = to
})
</script>

<template>
    <div class="grid justify-center text-center m-4">
        <h1 class="text-3xl font-semibold">Min Side</h1>

        <hr class="text-black bg-black opacity-50 h-0.5 m-3 mb-4" />

        <!-- <p class="font-semibold text-lg">Bestilling {{ paramId }}</p> -->
        
        <button class="fa fa-arrow-left fa-2x rounded-full bg-slate-600 w-fit p-2 text-white relative -left-14 hover:bg-slate-800 duration-200"
        @click="router.back"
        ></button>
        <!-- Normal bruger -->
        <OrderCard :key="paramId" :order="order"/>
    </div>    
</template>