<script setup>
import { store } from '../store/store.js'
import { useRouter } from 'vue-router'

const router = useRouter()

function handleSend() {
    store.addOrder(store.newOrder)
    router.push('/min-side')
}
</script>

<template>
    <div class="grid text-center [&>*]:m-2">
        <p class="text-xl font-semibold">Tjek information</p>
        
        <div class="grid md:grid-cols-2 grid-cols-1 [&>*]:m-2">
            <div class="input text-left">
                <p class="">Brand <strong :class="{'text-red-500': store.newOrder.brand === ''}">*</strong></p>
                <!-- <input placeholder="Dit brand - Produktvideo"> -->
                <p class="italic">{{ store.newOrder.brand }}</p>
            </div>
            <div class="input text-left">
                <p>Telefon <strong :class="{'text-red-500': store.newOrder.phone === ''}">*</strong></p>
                <!-- <input placeholder="Dit telefonnummer"> -->
                <p class="italic">{{ store.newOrder.phone }}</p>
            </div>
            <div class="input text-left">
                <p>E-mail <strong :class="{'text-red-500': store.newOrder.email === ''}">*</strong></p>
                <!-- <input placeholder="Din e-mail"> -->
                <p class="italic">{{ store.newOrder.email }}</p>
            </div>
            <div class="input text-left">
                <p>Hvor har du hørt om os?</p>
                <!-- <input placeholder="LinkedIn"> -->
                <p class="italic">{{ store.newOrder.source }}</p>
            </div>
        </div>

        <hr class="text-black bg-black h-0.5" />

        <div class="grid md:grid-cols-2 grid-cols-1 [&>*]:m-2">
            <div class="input text-left">
                <p>Projektnavn <strong :class="{'text-red-500': store.newOrder.projectName === ''}">*</strong></p>
                <!-- <input placeholder="Dit brand - Produktvideo"> -->
                <p class="italic">{{ store.newOrder.projectName }}</p>
            </div>
            <div class="input text-left">
                <p>Projekttype <strong :class="{'text-red-500': store.newOrder.projectType === ''}">*</strong></p>
                <!-- <input placeholder="User Generated Content"> -->
                <p class="italic">{{ store.newOrder.projectType }}</p>
            </div>
        </div>

        <hr class="text-black bg-black h-0.5" />

        <div class="grid md:grid-cols-2 grid-cols-1 [&>*]:m-2">
            <div class="input text-left">
                <p>Mængde af indhold <strong :class="{'text-red-500': store.newOrder.contentCount === ''}">*</strong></p>
                <!-- <input placeholder="1-8"> -->
                <p class="italic">{{ store.newOrder.contentCount }}</p>
            </div>
            <div class="input text-left">
                <p>Ekstra creator <strong :class="{'text-red-500': store.newOrder.extraCreator === ''}">*</strong></p>
                <!-- <input placeholder="Ja / Nej"> -->
                <p class="italic">{{ store.newOrder.extraCreator }}</p>
            </div>
            <div class="input text-left">
                <p>Længde af indhold <strong :class="{'text-red-500': store.newOrder.contentLength === ''}">*</strong></p>
                <!-- <input placeholder="Fx. 30-45 sekunder"> -->
                <p class="italic">{{ store.newOrder.contentLength }}</p>
            </div>
            <div class="input text-left">
                <p>Ekstra hook <strong :class="{'text-red-500': store.newOrder.extraHook === ''}">*</strong></p>
                <!-- <input placeholder="Ja / Nej"> -->
                <p class="italic">{{ store.newOrder.extraHook }}</p>
            </div>
            <div class="input text-left">
                <p>Tiltænkte channels <strong :class="{'text-red-500': store.newOrder.channels === ''}">*</strong></p>
                <!-- <input placeholder="Fx. Meta & TikTok"> -->
                <p class="italic">{{ store.newOrder.channels }}</p>
            </div>
            <div class="input text-left">
                <p>Ekstra noter</p>
                <!-- <input placeholder="Fx. 2 testimonials, 2 unboxing, 4 product review"> -->
                <p class="italic">{{ store.newOrder.extraNotes }}</p>
            </div>
        </div>
        
        <hr class="text-black bg-black h-0.5" />

        <div class="grid md:grid-cols-2 grid-cols-1 [&>*]:m-2">
            <div class="input text-left">
                <p class="font-semibold">Estimeret pris</p>
                <p>123.000.000 kr</p>
            </div>
            <div class="input text-left">
                <p class="font-semibold">Estimeret leveringstid</p>
                <p>3-5 hverdage</p>
            </div>
        </div>

        <button @click="handleSend" class="btn-red" 
        :class="{'bg-opacity-50 cursor-not-allowed':store.newOrder.brand === ''}" 
        :disabled="store.newOrder.brand === ''">
            Send
        </button>
        <p v-if="store.newOrder.brand === ''" class="text-red-600 font-semibold">* Tjek venligst at alle nødvendige felter er udfyldt</p>
    </div>
</template>