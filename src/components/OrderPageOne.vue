<!-- <script setup>
import { store } from '../store/store.js'
</script>

<template>
    <div class="grid text-center">
        <p class="text-xl font-semibold">Information om dig</p>
        
        <div class="grid md:grid-cols-2 grid-cols-1">
            <div class="input text-left">
                <p class="px-0">Brand <strong :class="{'text-red-500': store.newOrder.brand === ''}">*</strong></p>
                <input class="input-field" v-model="store.newOrder.brand" placeholder="Dit brand - Produktvideo">
            </div>
            <div class="input text-left">
                <p class="px-0">Telefon <strong :class="{'text-red-500': store.newOrder.phone === ''}">*</strong></p>
                <input class="input-field" v-model="store.newOrder.phone" placeholder="Dit telefonnummer">
            </div>
            <div class="input text-left">
                <p class="px-0">E-mail <strong :class="{'text-red-500': store.newOrder.email === ''}">*</strong></p>
                <input class="input-field" v-model="store.newOrder.email" placeholder="Din e-mail">
            </div>
            <div class="input text-left">
                <p class="px-0">Hvor har du hørt om os?</p>
                <input class="input-field" v-model="store.newOrder.source" placeholder="LinkedIn">
            </div>
        </div>
        
    </div>
</template>

<style scoped>
.toggle-btn {
    @apply border-gray-300 rounded-xl border-2 p-2 w-full text-white font-semibold hover:bg-opacity-90 duration-200 bg-opacity-75 py-3
}
</style> -->

<script setup>
import { store } from '../store/store.js'
</script>

<template>
    <div class="text-center w-full p-2">
        <p class="text-xl font-semibold m-2">Information om dit projekt</p>

        <div class="grid md:grid-cols-2 grid-cols-1 my-2">
            <div class="input text-left mr-1">
                <p class="px-0">Brand <strong :class="{'text-red-500': store.newOrder.brand === ''}">*</strong></p>
                <input class="input-field" v-model="store.newOrder.brand" placeholder="Dit brand - Produktvideo">
            </div>
            <div class="input text-left ml-1">
                <p class="px-0">Telefon <strong :class="{'text-red-500': store.newOrder.phone === ''}">*</strong></p>
                <input class="input-field" v-model="store.newOrder.phone" placeholder="Dit telefonnummer">
            </div>
        </div>
        <div class="grid md:grid-cols-2 grid-cols-1 my-2">
            <div class="input text-left mr-1">
                <p class="px-0">E-mail <strong :class="{'text-red-500': store.newOrder.email === ''}">*</strong></p>
                <input class="input-field" v-model="store.newOrder.email" placeholder="Din e-mail">
            </div>
            <div class="input text-left ml-1">
                <p class="px-0">Hvor har du hørt om os?</p>
                <input class="input-field" v-model="store.newOrder.source" placeholder="LinkedIn">
            </div>
        </div>
    </div>
</template>

<style scoped>
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
</style>