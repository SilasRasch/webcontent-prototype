<script setup>
import { auth } from '@/store/auth';
import MyDashboard from '@/components/min-side/MyDashboard.vue';
import BrandsDashboard from '@/components/min-side/BrandsDashboard.vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

const brandQuery = route.query["brands"] === 'true' ? true : false
const showOrders = ref(true) // true = orders, false = brands

if (brandQuery !== null) {
    if (brandQuery) showOrders.value = false
}

const handleShowBrands = () => {
    showOrders.value = false
    const query = { ...route.query }
    query["brands"] = true
    router.replace({ query })
}

const handleShowOrders = () => {
    showOrders.value = true
    const query = { ...route.query }
    query["brands"] = false
    router.replace({ query })
} 
</script>

<template>
    <div class="grid justify-center text-center m-4">
        <h1 class="text-3xl font-semibold">{{ auth.isAdmin() ? 'Kontrolpanel' : 'Min Side' }}</h1>

        <hr class="text-black bg-black opacity-50 h-0.5 m-3 mb-1 md:w-[50rem] sm:w-[30rem]" />

        <div v-if="auth.isUser()" class="flex justify-center items-center my-3 text-lg">
            <button class="bg-red-400 p-2 rounded-l-lg w-32 font-semibold hover:bg-red-500 duration-500" :class="{'bg-red-500':showOrders}"
            @click="handleShowOrders">Bestillinger</button>
            <button class="bg-red-400 p-2 rounded-r-lg w-32 font-semibold hover:bg-red-500 duration-500" :class="{'bg-red-500':!showOrders}"
            @click="handleShowBrands">Brands</button>
        </div>

        <div v-else class="mb-2">
            <p class="text-xl">{{ auth.isUser() ? 'Mine bestillinger' : auth.isCreator() ? 'Mine projekter' : 'Bestillinger' }}</p>
        </div>

        
        <div class="grid justify-center items-center">
            <TransitionGroup>
                <MyDashboard v-if="showOrders" />
                <BrandsDashboard v-else />

                <div v-if="showOrders && auth.isUser()" class="flex justify-center"><RouterLink to="/bestil" class="bg-red-400 p-2 mt-2 rounded-lg w-fit font-semibold hover:bg-red-500 duration-200">Opret nyt projekt</RouterLink></div>
            </TransitionGroup>
        </div>

        <!-- Bestil knap -->
        
        
    </div>    
</template>

<style scoped>
.v-enter-from {
  opacity: 0;
}

.v-enter-to {
  opacity: 1;
}

.v-enter-active {
  transition: all 0.8s ease-in-out;
}

.v-leave-from {
    z-index: -100;
    opacity: 0;
}

.v-leave-to {
    opacity: 0;
}

.v-leave-active {
    position: absolute;
}

.v-move {
    z-index: -100;
    opacity: 0;
}
</style>