<script setup>
import { store } from '../store/store.js'
</script>

<template>
    <div class="grid text-center [&>*]:m-2">
        <p class="text-xl font-semibold">Information om dit projekt</p>
        
        <div class="grid md:grid-cols-2 grid-cols-1 [&>*]:m-2">
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

        <div class="grid md:grid-cols-2 grid-cols-1 [&>*]:m-2">
            <div class="input text-left">
                <p>Mængde af indhold <strong :class="{'text-red-500': store.newOrder.contentCount === ''}">*</strong></p>
                <input v-model="store.newOrder.contentCount" placeholder="1-8">
            </div>
            <div class="input text-left">
                <p>Ekstra creator <strong :class="{'text-red-500': store.newOrder.extraCreator === ''}">*</strong></p>
                <input v-model="store.newOrder.extraCreator" placeholder="Ja / Nej">
            </div>
            <div class="input text-left">
                <p>Længde af indhold <strong :class="{'text-red-500': store.newOrder.contentLength === ''}">*</strong></p>
                <input v-model="store.newOrder.contentLength" placeholder="Fx. 30-45 sekunder">
            </div>
            <div class="input text-left">
                <p>Ekstra hook <strong :class="{'text-red-500': store.newOrder.extraHook === ''}">*</strong></p>
                <input v-model="store.newOrder.extraHook" placeholder="Ja / Nej">
            </div>
            <div class="input text-left">
                <p>Tiltænkte channels <strong :class="{'text-red-500': store.newOrder.channels === ''}">*</strong></p>
                <input v-model="store.newOrder.channels" placeholder="Fx. Meta & TikTok">
            </div>
            <div class="input text-left">
                <p>Ekstra noter</p>
                <input v-model="store.newOrder.extraNotes" placeholder="Fx. 2 testimonials, 2 unboxing, 4 product review">
            </div>
        </div>
        
    </div>
</template>