<script setup>
import { ref } from 'vue';
import { store } from '@/store/store';
import { useRouter } from 'vue-router';
import ToolTip from '../Input/ToolTip.vue';

const model = defineModel()
const router = useRouter()

let semiConfirm = ref(false)
let rejected = ref(false)

// Inputs
let price = ref('')
let deliveryFrom = ref()
let deliveryTo = ref()

const handleConfirm = () => semiConfirm.value = true;

const handleReject = () => {
    rejected.value = true
    model.value.denied = true
    // Send API-request to deny (add isDenied data point?)
}

const handleCancel = () => semiConfirm.value = false;

const handleSend = () => {
    store.confirmOrder(model.value.orderId, price.value, deliveryFrom.value, deliveryTo.value);
    router.push('/admin')
}
</script>

<template>
    <div v-if="!model.isConfirmed" class="md:w-[85vw] sm:w-[80vw] w-[70vw] max-w-[50rem] grid md:grid-cols-2 bg-slate-600 rounded-lg text-white mt-2">
        <TransitionGroup>
            <button v-if="!semiConfirm" @click="handleConfirm" class="mx-2 mr-1 btn-conf my-1 sm:my-2 bg-green-600">Bekræft</button>  
            <button v-if="!semiConfirm" @click="handleReject" class="mx-2 ml-1 btn-conf bg-red-600 my-1 sm:my-2">Afslå</button>   
        </TransitionGroup>

        <!-- Confirm buttons -->
        <TransitionGroup>
            <div v-if="semiConfirm" class="order-row mx-2 mr-1 my-1 sm:my-2">
                <p class="m-1 pb-0">Pris</p>
                <div class="flex justify-start">
                    <input v-model="price" type="number" class="order-row mt-1 p-2 w-1/2 m-2 mr-1" placeholder="ekskl. moms" />
                    <p class="order-row mt-1 p-2 w-1/2 m-2 ml-1">{{ price * 1.25 }} inkl. moms</p>
                </div>
            </div>
            <div v-if="semiConfirm" class="order-row mx-2 ml-1 my-1 sm:my-2">
                <p class="m-1 pb-0">Leveringstid <ToolTip class="bg-gray-500 font-serif hover:bg-opacity-50 text-white" label="i">Angivet i hverdage</ToolTip></p>
                <div class="flex justify-start">
                    <input v-model="deliveryFrom" type="number" class="order-row mt-1 p-2 w-1/2 m-2 mr-1" placeholder="Fra" />
                    <input v-model="deliveryTo" type="number" class="order-row mt-1 p-2 w-1/2 m-2 ml-1" placeholder="Til" />
                </div>
                
            </div>
            <button v-if="semiConfirm" @click="handleSend" class="mx-2 mr-1 btn-conf bg-green-600 m-0 sm:mb-2">Send</button>  
            <button v-if="semiConfirm" @click="handleCancel" class="mx-2 ml-1 btn-conf bg-red-600 m-0 sm:mb-2">Annuller</button> 
        </TransitionGroup> 
    </div>
</template>

<style scoped> 
.order-row {
    @apply bg-opacity-50 bg-slate-950 rounded-md text-left
}

.btn-conf {
    @apply rounded-md hover:bg-opacity-75 duration-500 cursor-pointer bg-opacity-50 text-center min-h-12
}

.v-enter-from {
  opacity: 0;
  transform: translateY(-25px)
}

.v-enter-to {
  opacity: 1;
  transform: translateY(0)
}

.v-enter-active {
  transition: all 0.6s ease-in-out;
}

.v-leave-from {
    z-index: -100;
    opacity: 0;
    /* transform: translateY(0) */
}

.v-leave-to {
    z-index: -100;
    opacity: 0;
    /* transform: translateY(25px) */
}

.v-leave-active {
    position: absolute;
}

.v-move {
    z-index: -100;
    opacity: 0;
}
</style>