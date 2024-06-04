<script setup>
import { store } from '../../store/store.js'
import SingleInput from '../Input/SingleInput.vue';
import ToolTip from '../Input/ToolTip.vue';
import { computed } from 'vue';

const isVideo = computed(() => {
    if (store.newOrder.projectType !== 'Statics' && store.newOrder.projectType !== 'Stilbilleder' && store.newOrder.projectType !== '') {
        return true
    }

    return false
})
</script>

<template>
    <div class="text-center w-full p-2">
        <p class="text-xl font-semibold m-2">Information om indholdet</p>

        <div class="input text-left my-2">
            <div class="input text-left">
                <p class="px-0">Noter til indhold <strong :class="{'text-red-500': store.newOrder.notes === ''}">*</strong></p>
                <textarea class="input-field p-2 resize-none" rows="3" v-model="store.newOrder.notes" 
                placeholder="Hvilke produkter, fokuspunkter, eventuelle ideer, etc..."></textarea>
            </div>
        </div>

        <hr class="text-black bg-black h-0.5 my-6" />

        <div v-if="isVideo" class="flex input text-left">
            <div class="input text-left w-full mr-1">
                <p class="px-0">Ekstra hook 
                    <ToolTip class="bg-yellow-500 text-white hover:bg-opacity-75 p-1" 
                    label="Populær!">Tilføj lidt ekstra spice til dit content med ekstra hooks!</ToolTip>
                </p>
                
                <button class="toggle-btn" 
                :class="{'bg-red-500 fa fa-times':!store.newOrder.extraHook, 'bg-green-500 fa fa-check':store.newOrder.extraHook}"
                @click="store.newOrder.extraHook = !store.newOrder.extraHook"
                ></button>
            </div>
            <div class="input text-left w-full ml-1 mb-2">
                <p class="px-0">Ekstra creator 
                    <ToolTip label="i" class="bg-gray-600 text-white hover:bg-opacity-75 font-serif m-1">Hvis du ønsker mere end én creator på dit projekt (+ {{ store.newOrder.contentCount <= 8 ? 2000 : 3500 }},-)</ToolTip>
                </p>
                <button class="toggle-btn" 
                :class="{'bg-red-500 fa fa-times':!store.newOrder.extraCreator, 'bg-green-500 fa fa-check':store.newOrder.extraCreator}"
                @click="store.newOrder.extraCreator = !store.newOrder.extraCreator"
                ></button>
            </div>
        </div>

        <!-- Extra hook -->
        <Transition>
            <div v-if="store.newOrder.extraHook" class="mb-0">
                <div class="input text-left mb-0">
                    <p class="px-0">Hvor mange videoer m. ekstra hook? <ToolTip label="i" class="bg-gray-600 text-white hover:bg-opacity-75 font-serif m-1">Hvis du ønsker ekstra hooks <br> (+ 200,- per video)</ToolTip></p>
                    <div class="flex flex-col justify-center mr-1">
                        <input v-model="store.newOrder.extraHookCount" class="" type="range" min="1" :max="store.newOrder.contentCount" step="1"/>
                        <span class="text-center opacity-50">{{ store.newOrder.extraHookCount }} stk</span>
                    </div>
                </div>
            </div>
        </Transition>

        <SingleInput v-model="store.newOrder.extraNotes" placeholder="F.eks. 2 testimonials, 2 unboxing, 4 product review...">Ekstra noter</SingleInput>
    </div>
</template>

<style scoped>
.toggle-btn {
    @apply border-gray-300 rounded-xl border-2 p-2 w-full text-white font-semibold hover:bg-opacity-90 duration-200 bg-opacity-75 py-3
}

/* Chrome */
input[type="range"]::-webkit-slider-runnable-track {
    @apply bg-red-400 h-2 rounded
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    @apply h-5 w-5 bg-gray-500 rounded-full -mt-1
}

/******** Firefox ********/
input[type="range"]::-moz-range-track {
    @apply bg-red-400 h-2 rounded p-0
}

.v-enter-from {
  opacity: 0;
  transform: translateY(-10px)
}

.v-enter-to {
  opacity: 1;
  transform: translateY(0)
}

.v-enter-active {
  transition: all 0.4s ease-in-out;
}

.v-leave-from {
    z-index: -100;
    opacity: 0;
    transform: translateY(0)
}

.v-leave-to {
    opacity: 0;
    transform: translateY(-5px)
}

.v-leave-active {
    transition: all 0.2s ease-in-out;
}

.v-move {
    opacity: 0;
    transition: all 0.2s ease-in-out;
}
</style>