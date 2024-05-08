<script setup>
import { store } from '../store/store.js'
import { ref } from 'vue' 
const props = defineProps(['order'])
var semiConfirm = ref(false)
var rejected = ref(false)

function handleConfirm() {
    console.log("Confirmed");
    semiConfirm.value = true
}

function handleReject() {
    console.log("Denied");
    rejected.value = true
    // Send API-request to deny (add isDenied data point?)
}

function handleCancel() {
    semiConfirm.value = false
}

function handleSend() {
    console.log("Sent");
    // store.thisorder.isConfirmed = true
    store.confirmOrder(props.order.orderId)
}
</script>

<template>
    <div v-if="!props.order.isConfirmed && !rejected" class="bg-slate-700 rounded-xl p-6 text-white md:min-w-[40vw] m-2">
        <h3 class="text-left m-2 bg-opacity-50 bg-slate-950 rounded-md p-4 font-semibold text-xl">
            Bestilling {{ props.order.orderId }}
        </h3>
        <div class="grid md:grid-cols-2 [&>*]:mx-2 [&>*]:m-1 md:[&>*]:m-2">
            <div class="order-row">
                <p class="m-1 pb-0">Brand</p>
                <p class="order-row m-2 italic">{{ props.order.brand }}</p>
            </div>
            <div class="order-row">
                <p class="m-1 pb-0">Projektnavn</p>
                <p class="order-row m-2 italic">{{ props.order.projectName }}</p>
            </div>
            <div class="order-row">
                <p class="m-1 pb-0">Projekttype</p>
                <p class="order-row m-2 italic">{{ props.order.projectType }}</p>
            </div>
            <div class="order-row">
                <p class="m-1 pb-0">Mængde af indhold</p>
                <p class="order-row m-2 italic">{{ props.order.contentCount }}</p>
            </div>
            <div class="order-row">
                <p class="m-1 pb-0">Længde af indhold</p>
                <p class="order-row m-2 italic">{{ props.order.contentLength }}</p>
            </div>
            <div class="order-row">
                <p class="m-1 pb-0">Tiltænkte channels</p>
                <p class="order-row m-2 italic">{{ props.order.channels }}</p>
            </div>

            <p class="order-row m-2">Email: {{ props.order.email }}</p>
            <p class="order-row m-2">Telefon: {{ props.order.phone }}</p>
            <p class="order-row m-2">Ekstra creator: {{ props.order.extraCreator }}</p>
            <p class="order-row m-2">Ekstra hook: {{ props.order.extraHook }}</p>
        </div>
        <div class="order-row text-left m-2 pb-0.5">
            <p class="m-1 pb-0">Noter</p>
            <p class="order-row m-2 italic">{{ props.order.extraNotes }}</p>
        </div>
        
        <div class="grid md:grid-cols-2 [&>*]:mx-2 [&>*]:m-1 md:[&>*]:m-2">
            <!-- <TransitionGroup name="order-card" appear> -->
            <TransitionGroup>
            <button v-if="!semiConfirm" @click="handleConfirm" class="m-1 btn-conf bg-green-600">Bekræft</button>  
            <button v-if="!semiConfirm" @click="handleReject" class="m-1 btn-conf bg-red-600">Afslå</button>   
            </TransitionGroup>

            <!-- Input -->
            <TransitionGroup>
            <div v-if="semiConfirm" class="order-row">
                <p class="m-1 pb-0">Pris</p>
                <input class="order-row m-2 p-2"/>
            </div>
            <div v-if="semiConfirm" class="order-row">
                <p class="m-1 pb-0">Leveringstid</p>
                <input class="order-row m-2 p-2" />
            </div>
            <button v-if="semiConfirm" @click="handleSend" class="m-1 btn-conf bg-green-600">Send</button>  
            <button v-if="semiConfirm" @click="handleCancel" class="m-1 btn-conf bg-red-600">Annuller</button> 
            </TransitionGroup> 
            <!-- </TransitionGroup> -->
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