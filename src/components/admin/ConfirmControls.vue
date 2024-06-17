<script setup>
import { ref } from 'vue';
import { store } from '@/store/store';
import { useRouter } from 'vue-router';
import ToolTip from '../ToolTip.vue';
import { auth } from '@/store/auth';

const model = defineModel()
const router = useRouter()

const semiConfirm = ref(false)
const semiCancel = ref(false)

// Inputs
let price = ref('')
let deliveryFrom = ref()
let deliveryTo = ref()

const handleReject = () => {
    store.rejectOrder(model.value.id)
    router.push('/admin')
}

const handleConfirm = () => {
    if (model.value.status.state === 0)
        store.confirmOrder(model.value.id, price.value, deliveryFrom.value, deliveryTo.value).then(() => router.push('/admin'))
    else
        store.handleStatusChange(model.value, model.value.status.category + 1).then(() => router.push("/admin"))
}
</script>

<template>
    <div v-if="model.status.state === 0 && auth.isAdmin()" class="md:w-[85vw] sm:w-[80vw] w-[70vw] max-w-[40rem] grid md:grid-cols-2 bg-slate-600 rounded-lg text-white mt-2">
        <TransitionGroup v-if="!semiConfirm && !semiCancel">
            <button @click="semiConfirm = true" class="mx-2 mr-1 btn-conf my-1 sm:my-2 bg-green-600" :key="1">Bekræft</button>  
            <button @click="semiCancel = true" class="mx-2 ml-1 btn-conf bg-red-600 my-1 sm:my-2" :key="2">Afslå</button>   
        </TransitionGroup>

        <!-- Confirm buttons -->
        <TransitionGroup v-if="semiConfirm">
            <div class="order-row mx-2 mr-1 my-1 sm:my-2" :key="1">
                <p class="m-1 pb-0">Pris</p>
                <div class="flex justify-start">
                    <input v-model="price" type="number" class="order-row mt-1 p-2 w-1/2 m-2 mr-1" placeholder="ekskl. moms" />
                    <p class="order-row mt-1 p-2 w-1/2 m-2 ml-1">{{ price * 1.25 }} inkl. moms</p>
                </div>
            </div>
            <div class="order-row mx-2 ml-1 my-1 sm:my-2" :key="4">
                <p class="m-1 pb-0">Leveringstid <ToolTip class="bg-gray-500 font-serif hover:bg-opacity-50 text-white" label="i">Angivet i hverdage</ToolTip></p>
                <div class="flex justify-start">
                    <input v-model="deliveryFrom" type="number" class="order-row mt-1 p-2 w-1/2 m-2 mr-1" placeholder="Fra" />
                    <input v-model="deliveryTo" type="number" class="order-row mt-1 p-2 w-1/2 m-2 ml-1" placeholder="Til" />
                </div>
                
            </div>
            <button @click="handleConfirm()" class="mx-2 mr-1 btn-conf bg-green-600 m-0 sm:mb-2" :key="2">Send</button>  
            <button @click="semiConfirm = false" class="mx-2 ml-1 btn-conf bg-red-600 m-0 sm:mb-2" :key="3">Annuller</button> 
        </TransitionGroup> 
        <TransitionGroup v-else-if="semiCancel">
            <button v-if="semiCancel" @click="handleReject()" class="m-2 mr-1 btn-conf bg-red-600 font-semibold" :key="1">Ja, afslå</button> 
            <button v-if="semiCancel" @click="semiCancel = false" class="m-2 ml-1 btn-conf bg-green-600" :key="2">Fortryd</button> 
        </TransitionGroup>
    </div>
    <div v-else-if="((model.status.category === 2 || model.status.category === 4) && auth.isUser())"
    class="bg-slate-600 rounded-lg text-white px-2 mt-2">
        <TransitionGroup>
            <button v-if="!semiConfirm" @click="handleConfirm()" class="btn-conf my-2 bg-green-600 w-full">
                Bekræft {{ model.status.category === 2 ? 'scripts' : 'videoer' }}
            </button>    
        </TransitionGroup>
    </div>
    <div v-else-if="((model.status.category === 1 || model.status.category === 3) && auth.isAdmin())"
    class="bg-slate-600 rounded-lg text-white px-2 mt-2">
        <TransitionGroup>
            <button v-if="!semiConfirm" @click="handleConfirm()" class="btn-conf my-2 bg-green-600 w-full">
                Send til {{ model.status.category === 1 ? 'Planlægning' : 'Feedback' }}
            </button>    
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