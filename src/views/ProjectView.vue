<script setup>
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
// import { store } from '@/store/store';
import { auth } from '@/store/auth';
import OrderCard from '@/components/min-side/OrderCard.vue';
import AdminStatusControls from '@/components/admin/AdminStatusControls.vue';
import { useOrderAPI } from '@/store/api/orderApi';
import { useCreatorAPI } from '@/store/api/creatorApi';

const route = useRoute()
const router = useRouter()
const api = useOrderAPI()
const creatorAPI = useCreatorAPI()

const id = ref(parseInt(route.params.id))

const model = ref(null)

const fetchOrder = () => {
    api.getOrder(id.value).then((data) => {
        model.value = data
    
        creatorAPI.getCreatorsByOrder(model.value.id).then(data => {
            if (data) {
                model.value.creatorList = data
            }
        })
    })
}

fetchOrder()

// Update order on route change
onBeforeRouteUpdate(async (to) => {
    id.value = to
    fetchOrder()
})

// Toggling status controls
const showControls = ref(false)
const toggleAdminControls = () => {
    showControls.value = !showControls.value
}
</script>

<template>
    <div v-if="model" class="grid justify-center text-center m-4">
        <div class="flex justify-center gap-2">
            <h1 class="text-3xl font-semibold">{{ auth.isAdmin() ? 'Administrér projekt' : 'Min Side' }}</h1>
            <button v-if="auth.isAdmin() && model.status.state !== 0" class="fa fa-pencil self-center bg-slate-800 p-2 text-white rounded-full opacity-95 hover:opacity-100 duration-200"
            @click="toggleAdminControls"></button>
        </div>

        <hr class="text-black bg-black opacity-50 h-0.5 m-3 mb-4" />

        <!-- Status controls -->
        <AdminStatusControls v-if="auth.isAdmin()" v-model="model" :show-controls="showControls" />

        <!-- Back button -->
        <button class="fa fa-arrow-left fa-2x rounded-full bg-slate-600 w-fit p-2 text-white relative -left-12 hover:bg-slate-800 duration-200"
        @click="router.back"></button>

        <div class="sm:flex grid justify-evenly items-start gap-2">
            <!-- Order information -->
            <OrderCard v-model="model" :key="id" @refetch="fetchOrder" />
        </div>
    </div>   
</template>