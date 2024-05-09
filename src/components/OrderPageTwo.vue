<script setup>
import { store } from '../store/store.js'
import DoubleInput from './Input/DoubleInput.vue';
import SingleInput from './Input/SingleInput.vue';

// Compute source String
store.newOrder.source = ''
store.newOrder.sourceArr.forEach((item) => {
    store.newOrder.source += item + ", "
})
store.newOrder.source = store.newOrder.source.slice(0, store.newOrder.source.length - 2)

console.log(store.newOrder);
</script>

<template>
    <div class="text-center w-full p-2">
        <p class="text-xl font-semibold m-2">Information om dit projekt</p>
        

        <DoubleInput v-model:firstInput="store.newOrder.projectName" v-model:secondInput="store.newOrder.projectType"
        placeholder-one="Dit brand - Produktvideo" placeholder-two="User Generated Content">
            <template v-slot:slotOne>Projektnavn</template>
            <template v-slot:slotTwo>Projekttype</template>
        </DoubleInput>

        <hr class="text-black bg-black h-0.5 my-6" />

        <!-- Sliders! -->
        <div class="grid md:grid-cols-2 grid-cols-1 mb-0">
            <div class="input text-left mb-0">
                <p class="px-0">Mængde af indhold</p>
                <div class="flex flex-col justify-center mr-1">
                    <input class="" v-model="store.newOrder.contentCount" type="range" min="1" max="16" step="1"/>
                    <span class="text-center opacity-50">{{ store.newOrder.contentCount }} stk</span>
                </div>
            </div>
            <div class="input text-left mb-0"> 
                <p class="px-0">Længde af indhold</p>
                <div class="flex flex-col justify-center ml-1">
                    <input v-model="store.newOrder.contentLength" type="range" min="20" max="120" step="5"/>
                    <span class="text-center opacity-50">{{ store.newOrder.contentLength }} sekunder</span>
                </div>
            </div>
        </div>

        <SingleInput class="mt-0" v-model="store.newOrder.format" placeholder="16:9, 9:16, 1:1">Format</SingleInput>
        <SingleInput v-model="store.newOrder.channels" placeholder="TikTok, Instagram, Facebook">Tiltænkte platforme</SingleInput>
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