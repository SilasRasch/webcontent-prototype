<script setup>
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { store } from '@/store/store';
import OrderCard from '@/components/min-side/OrderCard.vue';
import AdminConfirmControls from '@/components/admin/AdminConfirmControls.vue';
import AdminStatusControls from '@/components/admin/AdminStatusControls.vue';

const route = useRoute()
const router = useRouter()

const id = ref(parseInt(route.params.id))
const index = store.orders.findIndex((i) => i.orderId === id.value)
const model = ref(store.orders[index])

// Update order on route change
onBeforeRouteUpdate(async (to) => {
    id.value = to
    model.value = store.orders.find(i => i.orderId === parseInt(id.value))
})

// Toggling status controls
const showControls = ref(false)
function toggleAdminControls() {
    showControls.value = !showControls.value
}
</script>

<template>
    <div class="grid justify-center text-center m-4">
        <div class="flex justify-center gap-2">
            <h1 class="text-3xl font-semibold">Min Side</h1>
            <button class="fa fa-pencil self-center bg-slate-800 p-2 text-white rounded-full opacity-95 hover:opacity-100 duration-200"
            @click="toggleAdminControls"></button>
        </div>

        <hr class="text-black bg-black opacity-50 h-0.5 m-3 mb-4" />

        <!-- Status controls -->
        <AdminStatusControls v-model="model" :show-controls="showControls" />

        <!-- Back button -->
        <button class="fa fa-arrow-left fa-2x rounded-full bg-slate-600 w-fit p-2 text-white relative -left-14 hover:bg-slate-800 duration-200"
        @click="router.back"></button>
        <!-- Order information -->

        <OrderCard :key="id" @toggle-admin-controls="toggleAdminControls"/>

        <!-- Confirm controls -->
        <AdminConfirmControls v-model="model" />
    </div>   
</template>