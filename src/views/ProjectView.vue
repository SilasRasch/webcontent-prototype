<script setup>
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { store } from '@/store/store';
import OrderCard from '@/components/OrderCard.vue';

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
    <div class="mt-2 grid justify-center text-center" v-if="store.role === 'Bruger'">
        <h1 class="text-3xl font-semibold">Min Side</h1>
        <p class="font-semibold text-lg">Bestilling {{ paramId }}</p>

        <button class="fa fa-arrow-left fa-2x rounded-full bg-red-500 w-fit p-2 text-white relative -bottom-2 -left-10 hover:opacity-50 duration-200"
        @click="router.back"
        ></button>
        <div class="grid mt-[-3rem]">
            <OrderCard :key="paramId" :order="order"/>
        </div>
    </div>
</template>