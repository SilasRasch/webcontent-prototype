<script setup>
import { store } from '../../store/store.js'
import InputComponent from '../Input/InputComponent.vue';
import InputWrapper from '../Input/InputWrapper.vue';
import MultiLineInput from '../Input/MultiLineInput.vue';
import ToolTip from '../ToolTip.vue';
</script>

<template>
    <div class="text-center w-full p-2">
        <p class="text-xl font-semibold m-2">Information om indholdet</p>

        <InputWrapper v-if="store.showExtras()" >
            <div class="input text-left w-full">
                <p class="px-0">Ekstra hook
                    <ToolTip class="bg-yellow-500 text-white hover:bg-opacity-75 p-1"
                    label="Populær!">Tilføj lidt ekstra spice til dit content med ekstra hooks!</ToolTip>
                </p>

                <button class="toggle-btn"
                :class="{'bg-red-500 fa fa-times':!store.extraHookEnabled, 'bg-green-500 fa fa-check':store.extraHookEnabled}"
                @click="store.extraHookEnabled = !store.extraHookEnabled"
                ></button>
            </div>
            <div class="input text-left w-full mb-2">
                <p class="px-0">Ekstra creator
                    <ToolTip label="i" class="bg-gray-600 text-white hover:bg-opacity-75 font-serif m-1">Hvis du ønsker mere end én creator på dit projekt (+ {{ store.orderDataPageTwo.contentCount <= 8 ? 2000 : 3500 }},-)</ToolTip>
                </p>
                <button class="toggle-btn"
                :class="{'bg-red-500 fa fa-times':!store.orderDataPageThree.extraCreator, 'bg-green-500 fa fa-check':store.orderDataPageThree.extraCreator}"
                @click="store.orderDataPageThree.extraCreator = !store.orderDataPageThree.extraCreator"
                ></button>
            </div>
        </InputWrapper>

        <hr v-if="!store.extraHookEnabled && store.showExtras()" class="text-black bg-black h-0.5 my-6" />

        <!-- Extra hook -->
        <Transition>
            <div v-if="store.extraHookEnabled">
                <div class="mb-0">
                    <div class="input text-left mb-0">
                        <p class="px-0">Hvor mange videoer m. ekstra hook? <ToolTip label="i" class="bg-gray-600 text-white hover:bg-opacity-75 font-serif m-1">Hvis du ønsker ekstra hooks <br> (+ 200,- per video)</ToolTip></p>
                        <div class="flex flex-col justify-center">
                            <input v-model="store.orderDataPageThree.extraHook" class="" type="range" min="1" :max="store.orderDataPageTwo.contentCount" step="1"/>
                            <span class="text-center opacity-50">{{ store.orderDataPageThree.extraHook }} stk</span>
                        </div>
                    </div>
                </div>
                <hr class="text-black bg-black h-0.5 my-6" />
            </div>
        </Transition>

        <MultiLineInput v-model="store.orderDataPageThree.products" placeholder="Link til produkt-side" content-name="et produkt">Produkter</MultiLineInput>
        
        <InputWrapper>
            <InputComponent v-if="store.showExtras()" v-model="store.orderDataPageThree.creatorDescription" placeholder="Ønsker til alder, køn og udseende">Creator</InputComponent>
        </InputWrapper>

        <InputWrapper>
            <InputComponent v-model="store.orderDataPageThree.focusPoints" placeholder="Hvad er det vigtigste, som skal fremhæves?">Fokuspunkter</InputComponent>
        </InputWrapper>
        
        <MultiLineInput v-model="store.orderDataPageThree.ideas" placeholder="Har du set noget lignende? (Indsæt link)" content-name="en idé">Idéer</MultiLineInput>

        <hr class="text-black bg-black h-0.5 my-6" />

        <InputWrapper>
            <InputComponent v-model="store.orderDataPageThree.extraNotes" placeholder="F.eks. 2 testimonials, 2 unboxing, 4 product review...">Ekstra noter</InputComponent>
        </InputWrapper>
        <InputWrapper>
            <InputComponent v-model="store.orderDataPageThree.relevantFiles" placeholder="Alt du føler er relevant at have med (Google Drive-link)">Relevante filer</InputComponent>
        </InputWrapper>
        

    </div>
</template>

<style scoped>
.toggle-btn {
    @apply rounded-xl border-2 border-slate-700 p-2 w-full text-white font-semibold hover:bg-opacity-90 duration-200 bg-opacity-75 py-3
}

input[type="range"] {
    -webkit-appearance: none;
    @apply bg-slate-800;
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