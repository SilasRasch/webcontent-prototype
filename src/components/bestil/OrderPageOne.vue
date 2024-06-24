<script setup>
import { store } from '../../store/store.js'
import BrandChoice from '../Input/BrandChoice.vue';
import InputWrapper from '../Input/InputWrapper.vue';
import InputComponent from '../Input/InputComponent.vue';
</script>

<template>
    <div class="text-center w-full p-2" tag="div">
        <p class="text-xl font-semibold m-2">Grundinformation</p>

        <BrandChoice v-model="store.orderDataPageOne.brand" />

        <hr class="text-black bg-black h-0.5 my-6" />

        <InputWrapper>
            <InputComponent v-model="store.orderDataPageOne.contact.name" placeholder="Navn på kontaktperson" required>Kontaktperson</InputComponent>
            <InputComponent v-model="store.orderDataPageOne.contact.phone" placeholder="Telefon på kontaktperson" required>Kontaktnummer</InputComponent>
        </InputWrapper>

        <InputWrapper>
            <InputComponent v-model="store.orderDataPageOne.contact.email" placeholder="Navn på kontaktperson" required>Kontaktmail</InputComponent>
        </InputWrapper>
    </div>
</template>

<style scoped>
</style>