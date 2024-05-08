<script setup>
import { store } from '../store/store.js'
</script>

<template>
    <div class="grid text-center [&>*]:m-2">
        <p class="text-xl font-semibold">Information om dig</p>
        
        <div class="grid md:grid-cols-2 grid-cols-1 [&>*]:m-2">
            <div class="input text-left">
                <p>Brand <strong :class="{'text-red-500': store.newOrder.brand === ''}">*</strong></p>
                <input v-model="store.newOrder.brand" placeholder="Dit brand - Produktvideo">
            </div>
            <div class="input text-left">
                <p>Telefon <strong :class="{'text-red-500': store.newOrder.phone === ''}">*</strong></p>
                <input v-model="store.newOrder.phone" placeholder="Dit telefonnummer">
            </div>
            <div class="input text-left">
                <p>E-mail <strong :class="{'text-red-500': store.newOrder.email === ''}">*</strong></p>
                <input v-model="store.newOrder.email" placeholder="Din e-mail">
            </div>
            <div class="input text-left">
                <p>Hvor har du hørt om os?</p>
                <input v-model="store.newOrder.source" placeholder="LinkedIn">
            </div>
        </div>
        
    </div>
</template>