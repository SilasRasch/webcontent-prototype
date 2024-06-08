<script setup>
import { store } from '../../store/store.js'
import BrandChoice from '../Input/BrandChoice.vue';
import DoubleInput from '../Input/DoubleInput.vue';
import SingleInput from '../Input/SingleInput.vue';
</script>

<template>
    <div class="text-center w-full p-2" tag="div">
        <p class="text-xl font-semibold m-2">Grundinformation</p>

        <BrandChoice v-model="store.orderDataPageOne.brand" />

        <hr class="text-black bg-black h-0.5 my-6" />

        <DoubleInput v-model:firstInput="store.orderDataPageOne.brand.contact.name" v-model:secondInput="store.orderDataPageOne.brand.contact.phone"
        placeholder-one="Navn på kontaktperson" placeholder-two="Dit telefonnummer" required>
            <template v-slot:slotOne>Kontaktperson</template>
            <template v-slot:slotTwo>Kontaktnummer</template>
        </DoubleInput>

        <SingleInput v-model="store.orderDataPageOne.brand.contact.email" placeholder="Din e-mail" required>Kontaktmail</SingleInput>
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