<script setup>
import { store } from '../../store/store.js'
import { useRouter } from 'vue-router'
import { computed } from 'vue';
import ToolTip from '../Input/ToolTip.vue';

const router = useRouter()

function handleSend() {
    // Push order
    store.newOrder.price = estimatedPrice.value
    store.newOrder.deliveryTimeFrom = estimatedDelivery.value
    store.newOrder.deliveryTimeTo = estimatedDelivery.value + 2

    store.addOrder(store.newOrder)

    // Redirect to dashboard
    router.push('/min-side')

    // Reset order flow
    store.currOrderPage = 0
}

const estimatedPrice = computed(() => {
    var base = 750
    var price = 1500; // 1-2 videoer

    var mulitply = 1;

    if (store.newOrder.contentLength <= 45) {
        mulitply = 1
    }
    else if (store.newOrder.contentLength > 45 && store.newOrder.contentLength <= 90) {
        mulitply = 1.125
    }
    else {
        mulitply = 1.25
    }

    if (store.newOrder.contentCount > 1) {
        price = (price + (base * (store.newOrder.contentCount - 2))) * mulitply
    }
    else {
        price = (price + (base * (store.newOrder.contentCount - 1))) * mulitply
    }
    
    if (store.newOrder.extraCreator) {
        price += 1500
    }

    // Per extra hook video
    if (store.newOrder.extraHook) {
        price += 250 * store.newOrder.extraHookCount
    }

    return parseFloat(Math.round(price))
})

const estimatedDelivery = computed(() => {
    return parseInt(store.newOrder.contentCount)
})

</script>

<template>
    <div class="text-center w-full p-2 bg-gray-200 rounded-2xl mb-2 px-4">
        <p class="text-xl font-semibold m-2">Tjek information</p>

        <p class="text-left px-0 pt-0 opacity-50">Kontakt</p>
        <hr class="text-black bg-black opacity-50 h-0.5 mb-0" />

        <div class="grid md:grid-cols-2 grid-cols-1 my-2">
            <div class="text-left mr-1">
                <p class="px-0 font-semibold">Brand <strong :class="{'text-red-500': store.newOrder.brand === ''}">*</strong></p>
                <p class="input-value" >{{ store.newOrder.brand }}</p>
            </div>
            <div class="text-left ml-1">
                <p class="px-0 font-semibold">CVR <strong :class="{'text-red-500': store.newOrder.cvr === ''}">*</strong></p>
                <p class="input-value">{{ store.newOrder.cvr }}</p>
            </div>
        </div>


        <div class="grid md:grid-cols-2 grid-cols-1 my-2">
            <div class="text-left mr-1">
                <p class="px-0 font-semibold">Kontaktperson <strong :class="{'text-red-500': store.newOrder.contact.name === ''}">*</strong></p>
                <p class="input-value" >{{ store.newOrder.contact.name }}</p>
            </div>
            <div class="text-left ml-1">
                <p class="px-0 font-semibold">Telefon <strong :class="{'text-red-500': store.newOrder.contact.phone === ''}">*</strong></p>
                <p class="input-value">{{ store.newOrder.contact.phone }}</p>
            </div>
        </div>

        <div class="input text-left my-2">
            <div class="input text-left mt-0">
                <p class="px-0 font-semibold">E-mail <strong :class="{'text-red-500': store.newOrder.contact.email === ''}">*</strong></p>
                <p class="input-value">{{ store.newOrder.contact.email }}</p>
            </div>
        </div>


        <div class="input text-left my-2">
            <div class="input text-left mt-0">
                <p class="px-0 font-semibold">Hvor har du hørt om os? <!--<strong :class="{'text-red-500': store.newOrder.source === ''}">*</strong>--></p>
                <p class="input-value">{{ store.newOrder.source }}</p>
            </div>
        </div>
        
        <p class="text-left px-0 pt-0 opacity-50">Projekt</p>
        <hr class="text-black bg-black opacity-50 h-0.5 mb-0" />
        <!-- <hr class="text-black bg-black h-0.5 my-6" /> -->

        <div class="grid md:grid-cols-2 grid-cols-1 my-2">
            <div class="input text-left mr-1">
                <p class="px-0 font-semibold">Projektnavn <strong :class="{'text-red-500': store.newOrder.projectName === ''}">*</strong></p>
                <p class="input-value">{{ store.newOrder.projectName }}</p>
            </div>
            <div class="input text-left ml-1">
                <p class="px-0 font-semibold">Projekttype <strong :class="{'text-red-500': store.newOrder.projectType === ''}">*</strong></p>
                <p class="input-value">{{ store.newOrder.projectType }}</p>
            </div>
        </div>

        <div class="grid md:grid-cols-2 grid-cols-1 mb-0">
            <div class="input text-left mb-0">
                <p class="px-0 font-semibold">Mængde af indhold</p>
                <p class="input-value">{{ store.newOrder.contentCount }} stk</p>
            </div>
            <div class="input text-left mb-0"> 
                <p class="px-0 font-semibold">Længde af indhold</p>
                <p class="input-value">{{ store.newOrder.contentLength }} sekunder</p>
            </div>
        </div>

        <div class="input text-left my-2">
            <div class="input text-left mt-0">
                <p class="px-0 font-semibold">Format <strong :class="{'text-red-500': store.newOrder.format === ''}">*</strong></p>
                <p class="input-value">{{ store.newOrder.format }}</p>
            </div>
        </div>
        <div class="input text-left my-2">
            <div class="input text-left mt-0">
                <p class="px-0 font-semibold">Tiltænkte platforme <strong :class="{'text-red-500': store.newOrder.channels === ''}">*</strong></p>
                <p class="input-value">{{ store.newOrder.channels }}</p>
            </div>
        </div>

        <!-- Extras -->
        <p class="text-left px-0 pt-0 opacity-50">Content</p>
        <hr class="text-black bg-black opacity-50 h-0.5 mb-0" />
        <!-- <hr class="text-black bg-black h-0.5 my-6" /> -->

        <div class="input text-left my-2">
            <div class="input text-left">
                <p class="px-0 font-semibold">Noter til indhold <strong :class="{'text-red-500': store.newOrder.notes === ''}">*</strong></p>
                <!-- <textarea class="w-full bg-gray-200 p-2 resize-none" v-model="store.newOrder.notes" disabled></textarea> -->
                <p class="input-value text-wrap overflow-hidden text-ellipsis">{{ store.newOrder.notes }}</p>
            </div>
        </div>

        <div class="flex input text-left">
            <div class="input text-left w-full mr-1">
                <p class="px-0 font-semibold">Ekstra hook</p>
                <p v-if="store.newOrder.extraHook" class="input-value">{{ store.newOrder.extraHookCount }} stk</p>
                <p v-else class="input-value">Nej</p>
            </div>
            <div class="input text-left w-full ml-1">
                <p class="px-0 font-semibold">Ekstra creator</p>
                <p v-if="store.newOrder.extraCreator" class="input-value">Ja</p>
                <p v-else class="input-value">Nej</p>
            </div>
        </div>

        <div class="input text-left my-2">
            <div class="input text-left">
                <p class="px-0 font-semibold">Ekstra noter</p>
                <p class="input-value">{{ store.newOrder.extraNotes }}</p>
            </div>
        </div>

        <hr class="text-black bg-black h-0.5 my-4" />

        <div class="grid md:grid-cols-2 grid-cols-1">
            <div class="input text-left">
                <p class="font-semibold">Estimeret pris</p>
                <p>{{ estimatedPrice }} kr ekskl. moms <ToolTip class="bg-gray-500 font-serif hover:bg-opacity-50 text-white" label="i">{{ estimatedPrice * 1.25 }} kr inkl. moms</ToolTip></p>
            </div>
            <div class="input text-left">
                <p class="font-semibold">Estimeret leveringstid</p>
                <p class="">{{ estimatedDelivery }}-{{ estimatedDelivery + 2 }} hverdage <ToolTip class="bg-gray-500 font-serif hover:bg-opacity-50 text-white" label="i">Det er utroligt svært for os at give en præcis deadline for leveringstiden, vi estimerer derfor i intervaller. Husk dog stadig at det er et estimat.</ToolTip></p>
            </div>
        </div>
        <div class="grid">
            <button @click="handleSend" class="btn-red my-2 w-full" 
            :class="{'bg-opacity-50 cursor-not-allowed':store.newOrder.brand === ''}" 
            :disabled="store.newOrder.brand === ''">
                Send
            </button>
        </div>
        
        <p v-if="store.newOrder.brand === ''" class="text-red-600 font-semibold">* Tjek venligst at alle nødvendige felter er udfyldt</p>
    </div>
</template>

<style scoped>
.input-value {
    @apply italic
}

.toggle-btn {
    @apply border-gray-300 rounded-xl border-2 p-2 w-full text-white font-semibold hover:bg-opacity-90 duration-200 bg-opacity-75 py-3
}

/***** Chrome, Safari, Opera, and Edge Chromium *****/
input[type="range"]::-webkit-slider-runnable-track {
    @apply bg-red-400 h-2 rounded p-0
}

/******** Firefox ********/
input[type="range"]::-moz-range-track {
    @apply bg-red-400 h-2 rounded p-0
}

p {
    @apply px-0
}
</style>