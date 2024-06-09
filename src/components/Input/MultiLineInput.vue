<script setup>
import { ref } from 'vue';
import ToolTip from './ToolTip.vue';

const props = defineProps({
    placeholder: String,
    contentName: String,
    required: Boolean,
})

const model = defineModel()
const handleAdd = () => {
    if (tmpString.value !== '') {
        model.value.push(tmpString.value)
        tmpString.value = ''
    }
}

const handleRemove = (index) => {
    model.value.splice(index, 1)
}

const tmpString = ref('')
</script>

<template>
    <div class="input text-left my-2">
        <div class="relative input text-left mt-0">
            <p class="px-0"><slot></slot> <strong v-if="props.required" :class="{'text-red-500': model === ''}">*</strong> <ToolTip label="i" class="bg-gray-600 text-white hover:bg-opacity-75 font-serif m-1">Tryk tilføj for at føje {{ contentName }} til din ordre.</ToolTip></p>
            
            <div v-for="string, index in model" :key="index" class="w-full relative">
                <input class="w-full input-field p-2" v-model="model[index]" :placeholder="props.placeholder">
                <button class="bg-red-600 p-1.5 px-2 rounded-lg absolute right-2 bottom-2 fa fa-trash" @click="handleRemove(index)"></button>
            </div>

            <div class="w-full relative">
                <input class="w-full input-field p-2" v-model="tmpString" :placeholder="props.placeholder">
                <button class="bg-red-400 p-0.5 px-2 rounded-lg absolute right-2 bottom-2" @click="handleAdd">Tilføj</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
input:focus {
    outline: none;
    border-color: inherit;
    -webkit-box-shadow: none;
    @apply border-2 border-gray-300
}</style>