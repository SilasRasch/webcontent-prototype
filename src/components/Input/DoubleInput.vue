<script setup>
const props = defineProps(['placeholderOne', 'placeholderTwo'])
const firstInput = defineModel('firstInput')
const secondInput = defineModel('secondInput')
</script>

<template>
    <div class="grid md:grid-cols-2 grid-cols-1 my-2">
        <div class="input text-left mr-1">
            <p class="px-0"><slot name="slotOne"></slot> <strong :class="{'text-red-500': firstInput === ''}">*</strong></p>
            <input class="input-field" v-model="firstInput" :placeholder="props.placeholderOne">
        </div>
        <div class="input text-left ml-1">
            <p class="px-0"><slot name="slotTwo"></slot> <strong :class="{'text-red-500': secondInput === ''}">*</strong></p>
            <input class="input-field" v-model="secondInput" :placeholder="props.placeholderTwo">
        </div>
    </div>
</template>

<style scoped>
input:focus {
    outline: none;
    border-color: inherit;
    -webkit-box-shadow: none;
    @apply border-2 border-slate-600
}
</style>