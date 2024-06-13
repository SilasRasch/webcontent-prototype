<script setup>
import { store } from '../../store/store.js'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue';
import ToolTip from '../Input/ToolTip.vue';
import { auth } from '@/store/auth';
import { validateOrder } from '@/store/validation.js';

const router = useRouter()
const sendError = ref('')

const handleSend = () => {
    store.orderDataBase.price = estimatedPrice.value
    store.orderDataBase.userId = auth.loggedInUser.id
    
    if (!store.showExtras()) {
        delete store.orderDataPageThree.extraCreator
        delete store.orderDataPageThree.extraHook
    } else {
        store.orderDataPageThree.extraHook = store.extraHookEnabled ? false : store.orderDataPageThree.extraCreator
    }

    var compiledOrder = {
        ...store.orderDataBase,
        ...store.orderDataPageOne,
        ...store.orderDataPageTwo,
        ...store.orderDataPageThree,
    }

    store.addOrder(compiledOrder).then(() => {
        router.push('/min-side')
        store.currOrderPage = 0
    }).catch((err) => sendError.value = err.response.data)
    
}

const validated = computed(() => {
    if (validateOrder({ ...store.orderDataBase, ...store.orderDataPageOne, ...store.orderDataPageTwo, ...store.orderDataPageThree })) return true
    return false
})

const estimatedPrice = computed(() => {
    var price;
    if (store.orderDataPageTwo.projectType === 'User Generated Content' || store.orderDataPageTwo.projectType === 'Testimonials' && validated.value) {
        price = store.orderDataPageTwo.contentCount <= 8 ? 2000 : 3500

        if (store.extraHookEnabled)
            price += store.orderDataPageThree.extraHook ? 200 * store.orderDataPageThree.extraHook : 0
        
        price += store.orderDataPageThree.extraCreator ? store.orderDataPageThree.contentCount > 8 ? 3500 : 2000 : 0
    }
    else if (!validated.value) {
        price = 0
    }
    else {
        price = 3000
    }
    return parseFloat(Math.round(price))
})
</script>

<template>
    <div class="text-center w-full p-2 bg-slate-900 rounded-2xl mb-2 px-4">
        <p class="text-xl font-semibold m-2">Tjek information</p>

        <p class="text-left px-0 pt-0 opacity-50">Kontakt</p>
        <hr class="text-black bg-black opacity-50 h-0.5 mb-0" />

        <div class="grid md:grid-cols-2 grid-cols-1 my-2">
            <div class="text-left mr-1">
                <p class="px-0 font-semibold">Brand <strong :class="{'text-red-500': store.orderDataPageOne.brand.name === ''}">*</strong></p>
                <p class="input-value" >{{ store.orderDataPageOne.brand.name }}</p>
            </div>
            <div class="text-left ml-1">
                <p class="px-0 font-semibold">Kontaktperson <strong :class="{'text-red-500': store.orderDataPageOne.contact.name === ''}">*</strong></p>
                <p class="input-value" >{{ store.orderDataPageOne.contact.name }}</p>
            </div>
        </div>

        <div class="grid md:grid-cols-2 grid-cols-1 my-2">
            <div class="text-left mr-1">
                <p class="px-0 font-semibold">Kontaktmail <strong :class="{'text-red-500': store.orderDataPageOne.contact.email === ''}">*</strong></p>
                <p class="input-value">{{ store.orderDataPageOne.contact.email }}</p>
            </div>
            <div class="text-left ml-1">
                <p class="px-0 font-semibold">Kontaktnummer <strong :class="{'text-red-500': store.orderDataPageOne.contact.phone === ''}">*</strong></p>
                <p class="input-value">{{ store.orderDataPageOne.contact.phone }}</p>
            </div>
        </div>
        
        <p class="text-left px-0 pt-0 opacity-50">Projekt</p>
        <hr class="text-black bg-black opacity-50 h-0.5 mb-0" />
        <!-- <hr class="text-black bg-black h-0.5 my-6" /> -->

        <div class="grid md:grid-cols-2 grid-cols-1 my-2">
            <div class="input text-left mr-1">
                <p class="px-0 font-semibold">Projektnavn <strong :class="{'text-red-500': store.orderDataPageTwo.projectName === ''}">*</strong></p>
                <p class="input-value">{{ store.orderDataPageTwo.projectName }}</p>
            </div>
            <div class="input text-left ml-1">
                <p class="px-0 font-semibold">Projekttype <strong :class="{'text-red-500': store.orderDataPageTwo.projectType === ''}">*</strong></p>
                <p class="input-value">{{ store.orderDataPageTwo.projectType }}</p>
            </div>
        </div>

        <div class="grid md:grid-cols-2 grid-cols-1 mb-0">
            <div class="input text-left mb-0">
                <p class="px-0 font-semibold">Mængde af indhold</p>
                <p class="input-value">{{ store.orderDataPageTwo.contentCount }} stk</p>
            </div>
            <div v-if="store.isVideo()" class="input text-left mb-0"> 
                <p class="px-0 font-semibold">Længde af indhold</p>
                <p class="input-value">{{ store.orderDataPageTwo.contentLength }} sekunder</p>
            </div>
        </div>

        <div class="input text-left my-2">
            <div class="input text-left mt-0">
                <p class="px-0 font-semibold">Format <strong :class="{'text-red-500': store.orderDataPageTwo.format === ''}">*</strong></p>
                <p class="input-value">{{ store.orderDataPageTwo.format }}</p>
            </div>
        </div>
        <div class="input text-left my-2">
            <div class="input text-left mt-0">
                <p class="px-0 font-semibold">Tiltænkte platforme <strong :class="{'text-red-500': store.orderDataPageTwo.platforms === ''}">*</strong></p>
                <p class="input-value">{{ store.orderDataPageTwo.platforms }}</p>
            </div>
        </div>

        <!-- Extras -->
        <p v-if="store.showPageThree()" class="text-left px-0 pt-0 opacity-50">Content</p>
        <hr v-if="store.showPageThree()" class="text-black bg-black opacity-50 h-0.5 mb-0" />

        <div v-if="store.showExtras()" class="flex input text-left">
            <div class="input text-left w-full mr-1">
                <p class="px-0 font-semibold">Ekstra hook</p>
                <p v-if="store.extraHookEnabled" class="input-value">{{ store.orderDataPageThree.extraHook }} stk</p>
                <p v-else class="input-value">Nej</p>
            </div>
            <div class="input text-left w-full ml-1">
                <p class="px-0 font-semibold">Ekstra creator</p>
                <p v-if="store.orderDataPageThree.extraCreator" class="input-value">Ja</p>
                <p v-else class="input-value">Nej</p>
            </div>
        </div>

        <div class="input text-left my-2" v-if="store.orderDataPageThree.products.length > 0">
            <div class="input text-left">
                <p class="px-0 font-semibold">Produkter</p>
                <p class="input-value">{{ store.orderDataPageThree.products }}</p>
            </div>
        </div>

        <div class="input text-left my-2" v-if="store.orderDataPageThree.creatorDescription">
            <div class="input text-left">
                <p class="px-0 font-semibold">Creator</p>
                <p class="input-value">{{ store.orderDataPageThree.creatorDescription }}</p>
            </div>
        </div>

        <div class="input text-left my-2" v-if="store.orderDataPageThree.focusPoints">
            <div class="input text-left">
                <p class="px-0 font-semibold">Fokuspunkter</p>
                <p class="input-value">{{ store.orderDataPageThree.focusPoints }}</p>
            </div>
        </div>

        <div class="input text-left my-2" v-if="store.orderDataPageThree.ideas.length > 0">
            <div class="input text-left">
                <p class="px-0 font-semibold">Idéer</p>
                <p class="input-value">{{ store.orderDataPageThree.ideas }}</p>
            </div>
        </div>

        <div class="input text-left my-2"  v-if="store.orderDataPageThree.extraNotes">
            <div class="input text-left">
                <p class="px-0 font-semibold">Ekstra noter</p>
                <p class="input-value">{{ store.orderDataPageThree.extraNotes }}</p>
            </div>
        </div>

        <div class="input text-left my-2" v-if="store.orderDataPageThree.relevantFiles">
            <div class="input text-left">
                <p class="px-0 font-semibold">Relevante filer</p>
                <p class="input-value">{{ store.orderDataPageThree.relevantFiles }}</p>
            </div>
        </div>

        <hr class="text-black bg-black h-0.5 my-4" />

        <div class="grid md:grid-cols-2 grid-cols-1">
            <div class="input text-left">
                <p class="font-semibold">Estimeret pris</p>
                <p>{{ estimatedPrice }} kr ekskl. moms <ToolTip class="bg-gray-500 font-serif hover:bg-opacity-50 text-white" label="i">Bemærk prisen bekræftes når bestillingen er behandlet</ToolTip></p>
            </div>
            <div class="input text-left">
                <p class="font-semibold">Estimeret leveringstid</p>
                <p class="">{{ store.orderDataBase.deliveryTimeFrom }}-{{ store.orderDataBase.deliveryTimeTo }} hverdage <ToolTip class="bg-gray-500 font-serif hover:bg-opacity-50 text-white" label="i">Bemærk leveringstiden bekræftes når bestillingen er behandlet</ToolTip></p>
            </div>
        </div>
        <div class="grid">
            <button @click="handleSend" class="btn-red my-2 w-full" 
            :class="{'bg-opacity-50 cursor-not-allowed':!validated}" 
            :disabled="!validated">
                Send
            </button>
        </div>
        <ToolTip v-if="store.showExtras()" label="Hvordan regnes prisen ud?" class="opacity-90 mb-1">
            Pris per optagedag (UGC og Testimonials)<br> 1-8 videoer: 2000,- <br> 9-16 videoer: 3500,- <br><br>
            Ekstra hook: 200,- per video <br> Ekstra creator: <br> 1-8 videoer: 2000,- <br> 9-16 videoer: 3500 (per projekt) <br><br>
            Alle priser er ekskl. moms
        </ToolTip>
        <ToolTip v-else-if="store.orderDataPageTwo.projectType !== ''" label="Hvordan regnes prisen ud?" class="opacity-90 mb-1">
            Pris per optagedag <br> 1-6 timer: 3000,- ekskl. moms
        </ToolTip>
        <p v-if="!validated" class="text-red-600 font-semibold">* Tjek venligst at alle nødvendige felter er udfyldt</p>
        <p v-if="sendError" class="text-red-600 font-semibold">* {{ sendError }}</p>
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