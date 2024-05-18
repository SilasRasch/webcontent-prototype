<script setup>
import { store } from '../../store/store.js'
import DoubleInput from '../Input/DoubleInput.vue';
import SingleInput from '../Input/SingleInput.vue';
import SingleMultiSelect from '../Input/SingleMultiSelect.vue';
</script>

<template>
    <div class="text-center w-full p-2" tag="div">
        <p class="text-xl font-semibold m-2">Grundinformation</p>

        <DoubleInput v-model:firstInput="store.newOrder.brand" v-model:secondInput="store.newOrder.cvr"
        placeholder-one="Dit brand" placeholder-two="F.eks. 40791752">
            <template v-slot:slotOne>Brand</template>
            <template v-slot:slotTwo>CVR</template>
        </DoubleInput>

        <hr class="text-black bg-black h-0.5 my-6" />

        <DoubleInput v-model:firstInput="store.newOrder.contact.name" v-model:secondInput="store.newOrder.contact.phone"
        placeholder-one="Navn på kontaktperson" placeholder-two="Dit telefonnummer">
            <template v-slot:slotOne>Kontaktperson</template>
            <template v-slot:slotTwo>Telefon</template>
        </DoubleInput>

        <SingleInput v-model="store.newOrder.contact.email" placeholder="Din e-mail" required>E-mail</SingleInput>

        <hr class="text-black bg-black h-0.5 my-6" />

        <SingleMultiSelect v-model="store.sourceArr" label="Hvor har du hørt om os?" required
        :items="['LinkedIn', 'Facebook', 'Instagram', 'Mundtligt']">
            Hvor har du hørt om os?</SingleMultiSelect>
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