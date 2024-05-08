<script setup>
import { store } from '../store/store.js'
</script>

<template>
    <div class="text-center w-full p-2">
        <p class="text-xl font-semibold m-2">Information om dit projekt</p>
        
        <div class="grid md:grid-cols-2 grid-cols-1 my-2">
            <div class="input text-left mr-1">
                <p class="px-0">Projektnavn <strong :class="{'text-red-500': store.newOrder.projectName === ''}">*</strong></p>
                <input class="input-field" v-model="store.newOrder.projectName" placeholder="Dit brand - Produktvideo">
            </div>
            <div class="input text-left ml-1">
                <p class="px-0">Projekttype <strong :class="{'text-red-500': store.newOrder.projectType === ''}">*</strong></p>
                <input class="input-field" v-model="store.newOrder.projectType" placeholder="User Generated Content">
            </div>
        </div>

        <hr class="text-black bg-black h-0.5 my-6" />

        <div class="grid md:grid-cols-2 grid-cols-1 mb-0">
            <div class="input text-left mb-0">
                <p class="px-0">Mængde af indhold <strong :class="{'text-red-500': store.newOrder.contentCount === ''}">*</strong></p>
                <div class="flex flex-col justify-center mr-1">
                    <input class="" v-model="store.newOrder.contentCount" type="range" min="1" max="9" step="1"/>
                    <span class="text-center opacity-50">{{ store.newOrder.contentCount }} stk</span>
                </div>
            </div>
            <div class="input text-left mb-0"> 
                <p class="px-0">Længde af indhold <strong :class="{'text-red-500': store.newOrder.contentLength === ''}">*</strong></p>
                <div class="flex flex-col justify-center ml-1">
                    <input v-model="store.newOrder.contentLength" type="range" min="10" max="120" step="5"/>
                    <span class="text-center opacity-50">{{ store.newOrder.contentLength }} sekunder</span>
                </div>
            </div>
        </div>

        <div class="input text-left my-2 mt-0">
            <div class="input text-left mt-0">
                <p class="px-0">Format <strong :class="{'text-red-500': store.newOrder.extraNotes === ''}">*</strong></p>
                <input class="w-full input-field" v-model="store.newOrder.extraNotes" placeholder="16:9, 9:16, 1:1">
            </div>
        </div>
        <div class="input text-left my-2">
            <div class="input text-left mt-0">
                <p class="px-0">Tiltænkte platforme <strong :class="{'text-red-500': store.newOrder.extraNotes === ''}">*</strong></p>
                <input class="w-full input-field" v-model="store.newOrder.extraNotes" placeholder="TikTok, Instagram, Facebook">
            </div>
        </div>

        <!-- Extras -->
        <hr class="text-black bg-black h-0.5 my-6" />

        <div class="flex input text-left">
            <div class="input text-left w-full mr-1">
                <p class="px-0">Ekstra hook <strong>*</strong></p>
                <button class="toggle-btn" 
                :class="{'bg-red-500 fa fa-times':!store.newOrder.extraHook, 'bg-green-500 fa fa-check':store.newOrder.extraHook}"
                @click="store.newOrder.extraHook = !store.newOrder.extraHook"
                ></button>
            </div>
            <div class="input text-left w-full ml-1">
                <p class="px-0">Ekstra creator <strong>*</strong></p>
                <!-- <input class="" v-model="store.newOrder.extraCreator" placeholder="Ja / Nej"> -->
                <button class="toggle-btn" 
                :class="{'bg-red-500 fa fa-times':!store.newOrder.extraCreator, 'bg-green-500 fa fa-check':store.newOrder.extraCreator}"
                @click="store.newOrder.extraCreator = !store.newOrder.extraCreator"
                ></button>
            </div>
        </div>

        <div class="input text-left my-2">
            <div class="input text-left">
                <p class="px-0">Noter</p>
                <input class="input-field" v-model="store.newOrder.extraNotes" placeholder="Fx. 2 testimonials, 2 unboxing, 4 product review">
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