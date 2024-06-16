<script setup>
import { store } from '../../store/store.js'
import InputWrapper from '../Input/InputWrapper.vue';
import SingleInput from '../Input/SingleInput.vue';
import SingleMultiSelect from '../Input/SingleMultiSelect.vue';
import SingleSelect from '../Input/SingleSelect.vue';
import ToolTip from '../Input/ToolTip.vue';
</script>

<template>
    <div class="text-center w-full p-2">
        <p class="text-xl font-semibold m-2">Information om dit projekt</p>
    
        <InputWrapper>
            <SingleInput class="input w-full m-0" v-model="store.orderDataPageTwo.projectName" required placeholder="Helst noget beskrivende...">Projektnavn</SingleInput>
            <SingleSelect class="input w-full my-2" v-model="store.orderDataPageTwo.projectType" required :items="['User Generated Content', 'Video Ads', 'Talking Head', 'Testimonials', 'Organisk SoMe content', 'Statics', 'Stilbilleder', 'Drone video']">Projekttype</SingleSelect>
        </InputWrapper>

        <hr class="text-black bg-black h-0.5 my-6" />

        <!-- Sliders! -->
        <Transition>
            <InputWrapper v-if="store.orderDataPageTwo.projectType">
                <div class="input text-left mb-0 w-full">
                    <p class="px-0">Mængde af indhold <ToolTip v-if="store.showExtras()" label="i" class="bg-gray-600 text-white hover:bg-opacity-75 font-serif mx-1">Hvis mængden overstiger 8 videoer er prisen 3500,- per optagedag</ToolTip></p>
                    <div class="flex flex-col justify-center mr-1">
                        <input class="" v-model="store.orderDataPageTwo.contentCount" type="range" :min="store.isVideo() ? 1 : 1" :max="store.isVideo() ? 16 : 50" step="1"/>
                        <span class="text-center opacity-50">{{ store.orderDataPageTwo.contentCount }} stk</span>
                    </div>
                </div>
                <div class="input text-left mb-0 w-full"  v-if="store.isVideo()"> 
                    <p class="px-0">Længde af indhold</p>
                    <div class="flex flex-col justify-center ml-1">
                        <input v-model="store.orderDataPageTwo.contentLength" type="range" min="20" max="120" step="5"/>
                        <span class="text-center opacity-50">{{ store.orderDataPageTwo.contentLength }} sekunder</span>
                    </div>
                </div>
            </InputWrapper>
        </Transition>

        <SingleMultiSelect v-model="store.formatArr" required other
        :items="['16:9', '9:16', '1:1', '4:5']">
            Format
        </SingleMultiSelect>

        <SingleMultiSelect v-model="store.channelsArr" required other
        :items="['TikTok', 'Instagram', 'Facebook', 'YouTube', 'Snapchat', 'Pinterest']">
            Tiltænkte platforme
        </SingleMultiSelect>
    </div>
</template>

<style scoped>
.toggle-btn {
    @apply border-gray-300 rounded-xl border-2 p-2 w-full text-white font-semibold hover:bg-opacity-90 duration-200 bg-opacity-75 py-3
}

input[type="range"]::-webkit-slider-runnable-track {
    @apply bg-red-400 h-2 rounded my-2
}

input[type="range"] {
    -webkit-appearance: none;
    @apply bg-slate-800;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: 1px solid grey;
    @apply h-[18px] w-[18px] bg-white rounded-full -mt-[5px];
}

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