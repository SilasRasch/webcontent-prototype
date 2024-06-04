<script setup>
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
// import { store } from '@/store/store';
import { auth } from '@/store/auth';
import OrderCard from '@/components/min-side/OrderCard.vue';
import AdminStatusControls from '@/components/admin/AdminStatusControls.vue';
import { useOrderAPI } from '@/store/api/orderApi';

const route = useRoute()
const router = useRouter()
const api = useOrderAPI()

const id = ref(parseInt(route.params.id))

const model = ref(null)
api.getOrder(id.value).then((data) => model.value = data)

// Update order on route change
onBeforeRouteUpdate(async (to) => {
    id.value = to
    api.getOrder(id).then((data) => model.value = data)
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
            <OrderCard v-model="model" :key="id" @toggle-admin-controls="toggleAdminControls"/>
            
            <!-- <div v-if="model.status.category > 1 || (auth.isAdmin() && model.status.state > 0)" class="flex gap-4 bg-slate-600 sm:-mt-12 p-4 rounded-lg w-fit text-white font-semibold ">
                <div class="grid gap-4">
                    <p class="p-4 bg-red-500 rounded-lg text-lg bg-opacity-75">Scripts</p>
                    <ScriptModal v-for="script, index in model.scripts" :key="index" :index="index" :name="script.name" :link="script.link" v-model="model" />
                </div>
            </div> -->
        </div>
    </div>   
</template>