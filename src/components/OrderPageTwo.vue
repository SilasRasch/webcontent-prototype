<script setup>
import { store } from '../store/store.js'
</script>

<template>
    <div class="text-center">
        <p class="text-xl font-semibold m-2">Information om dit projekt</p>
        
        <div class="grid md:grid-cols-2 grid-cols-1 [&>*]:m-2 m-2">
            <div class="input text-left">
                <p>Projektnavn <strong :class="{'text-red-500': store.newOrder.projectName === ''}">*</strong></p>
                <input v-model="store.newOrder.projectName" placeholder="Dit brand - Produktvideo">
            </div>
            <div class="input text-left">
                <p>Projekttype <strong :class="{'text-red-500': store.newOrder.projectType === ''}">*</strong></p>
                <input v-model="store.newOrder.projectType" placeholder="User Generated Content">
            </div>
        </div>

        <hr class="text-black bg-black h-0.5" />

        <div class="grid md:grid-cols-2 grid-cols-1 m-2 mb-0">
            <div class="input text-left m-2 mb-0">
                <p>Mængde af indhold <strong :class="{'text-red-500': store.newOrder.contentCount === ''}">*</strong></p>
                <input v-model="store.newOrder.contentCount" placeholder="1-8">
            </div>
            <div class="input text-left m-2 mb-0"> 
                <p>Længde af indhold <strong :class="{'text-red-500': store.newOrder.contentLength === ''}">*</strong></p>
                <input v-model="store.newOrder.contentLength" placeholder="Fx. 30-45 sekunder">
            </div>
        </div>

        <div class="input text-left m-2 mt-0">
            <div class="input text-left m-2 mt-0">
                <p>Format <strong :class="{'text-red-500': store.newOrder.extraNotes === ''}">*</strong></p>
                <input class="w-full" v-model="store.newOrder.extraNotes" placeholder="16:9, 9:16, 1:1">
            </div>
        </div>
        <div class="input text-left m-2">
            <div class="input text-left m-2 mt-0">
                <p>Tiltænkte platforme <strong :class="{'text-red-500': store.newOrder.extraNotes === ''}">*</strong></p>
                <input class="w-full" v-model="store.newOrder.extraNotes" placeholder="TikTok, Instagram, Facebook">
            </div>
        </div>

        <!-- Extras -->
        <hr class="text-black bg-black h-0.5 mt-4" />

        <div class="flex input text-left [&>*]:m-2 m-2">
            <div class="input text-left w-full">
                <p>Ekstra hook <strong>*</strong></p>
                <button class="toggle-btn" 
                :class="{'bg-red-500 fa fa-times':!store.newOrder.extraHook, 'bg-green-500 fa fa-check':store.newOrder.extraHook}"
                @click="store.newOrder.extraHook = !store.newOrder.extraHook"
                ></button>
            </div>
            <div class="input text-left w-full">
                <p>Ekstra creator <strong>*</strong></p>
                <!-- <input class="" v-model="store.newOrder.extraCreator" placeholder="Ja / Nej"> -->
                <button class="toggle-btn" 
                :class="{'bg-red-500 fa fa-times':!store.newOrder.extraCreator, 'bg-green-500 fa fa-check':store.newOrder.extraCreator}"
                @click="store.newOrder.extraCreator = !store.newOrder.extraCreator"
                ></button>
            </div>
        </div>

        <div class="input text-left [&>*]:m-2 m-2">
            <div class="input text-left">
                <p>Noter</p>
                <input class="" v-model="store.newOrder.extraNotes" placeholder="Fx. 2 testimonials, 2 unboxing, 4 product review">
            </div>
        </div>
    </div>
</template>

<style scoped>
input {
    @apply border-gray-300 rounded-xl border-2 mx-2 w-full
}

.toggle-btn {
    @apply border-gray-300 rounded-xl border-2 mx-2 p-2 w-full text-white font-semibold hover:bg-opacity-90 duration-200 bg-opacity-75 py-3
}
</style>