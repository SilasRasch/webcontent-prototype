<script setup>
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { store } from '@/store/store';
import OrderCard from '@/components/min-side/OrderCard.vue';
import ToolTip from '@/components/Input/ToolTip.vue';

const route = useRoute()
const router = useRouter()

const id = ref(parseInt(route.params.id))
const index = store.orders.findIndex((i) => i.orderId === id.value)

var tmp
if (id.value > 5) {
    tmp = ref(store.orders[index])
}
else {
    tmp = ref(store.orders[0])
}
const model = tmp

onBeforeRouteUpdate(async (to) => {
    // paramId.value = await fetchOrder(to.params.id)
    id.value = to
    model.value = store.orders.find(i => i.orderId === parseInt(id.value))
})

var semiConfirm = ref(false)
var rejected = ref(false)

function handleConfirm() {
    semiConfirm.value = true
}

function handleReject() {
    rejected.value = true
    // Send API-request to deny (add isDenied data point?)
}

function handleCancel() {
    semiConfirm.value = false
}

function handleSend() {
    store.confirmOrder(id.value, price.value, deliveryFrom.value, deliveryTo.value);
    
    router.push('/admin')
}

const showControls = ref(false)

function toggleAdminControls() {
    showControls.value = !showControls.value
}

function handleStatusChange(newCategory) {
    if (newCategory <= 4) {
        model.value.status = newCategory
        model.value.isDenied = false
        model.value.isComplete = false
    } 
    else if (newCategory === 5) {
        model.value.status = 0
        model.value.isDenied = false
        model.value.isComplete = true
    } 
    else if (newCategory === 6) {
        model.value.status = 0
        model.value.isDenied = true
        model.value.isComplete = false
    }
    
    router.push('/admin')
}

var price = ref('') // NaN parse
var deliveryFrom = ref()
var deliveryTo = ref()
</script>

<template>
    <div class="grid justify-center text-center m-4">
        <div class="flex justify-center gap-2">
            <h1 class="text-3xl font-semibold">Min Side</h1>
            <button class="fa fa-pencil self-center bg-slate-800 p-2 text-white rounded-full opacity-95 hover:opacity-100 duration-200"
            @click="toggleAdminControls"></button>
        </div>
        

        <hr class="text-black bg-black opacity-50 h-0.5 m-3 mb-4" />
        <Transition>
            <div v-if="model.isConfirmed && showControls">
                <h3 class="text-lg font-semibold">Skift status</h3>
                <div class="flex justify-between gap-2">
                    <button v-if="model.status !== 1" @click="handleStatusChange(1)" class="bg-red-500 btn-control"><i class="fa fa-arrow-right"></i> I kø</button>
                    <button v-if="model.status !== 2" @click="handleStatusChange(2)"  class="bg-yellow-500 btn-control"><i class="fa fa-arrow-right"></i> Planlægning</button>
                    <button v-if="model.status !== 3" @click="handleStatusChange(3)"  class="bg-blue-500 btn-control"><i class="fa fa-arrow-right"></i> I gang</button>
                    <button v-if="model.status !== 4" @click="handleStatusChange(4)"  class="bg-green-500 btn-control"><i class="fa fa-arrow-right"></i> Feedback</button>
                    <button @click="handleStatusChange(5)"  class="bg-violet-500 btn-control"><i class="fa fa-check"></i></button>
                    <button @click="handleStatusChange(6)"  class="bg-red-500 btn-control"><i class="fa fa-trash"></i></button>
                </div>
            </div>
        </Transition>
        

        <button class="fa fa-arrow-left fa-2x rounded-full bg-slate-600 w-fit p-2 text-white relative -left-14 hover:bg-slate-800 duration-200"
        @click="router.back"></button>
        <!-- Normal bruger -->
        <OrderCard :key="id" @toggle-admin-controls="toggleAdminControls"/>

        <div v-if="!model.isConfirmed" class="md:w-[85vw] sm:w-[80vw] w-[70vw] max-w-[50rem] grid md:grid-cols-2 bg-slate-600 rounded-lg text-white mt-2">
            <TransitionGroup>
                <button v-if="!semiConfirm" @click="handleConfirm" class="mx-2 mr-1 btn-conf my-1 sm:my-2 bg-green-600">Bekræft</button>  
                <button v-if="!semiConfirm" @click="handleReject" class="mx-2 ml-1 btn-conf bg-red-600 my-1 sm:my-2">Afslå</button>   
            </TransitionGroup>

            <!-- Input -->
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
    </div>   
</template>

<style scoped> 
.order-row {
    @apply bg-opacity-50 bg-slate-950 rounded-md text-left
}

.btn-conf {
    @apply rounded-md hover:bg-opacity-75 duration-500 cursor-pointer bg-opacity-50 text-center min-h-12
}

.btn-control {
    @apply p-2 rounded-lg text-white mb-2 font-semibold w-full shadow-black shadow-sm hover:opacity-80 duration-200
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