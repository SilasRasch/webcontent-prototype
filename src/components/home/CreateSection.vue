<script setup>
import { ref } from 'vue';

const emit = defineEmits(["goBack"])

const email = ref('')
// const password = ref('')
const error = ref('')

const handleRequest = () => {
    console.log("Requested login");
}
</script>

<template>
    <section class="flex justify-center gap-2 md:gap-8 items-center py-36">
        <div class="text-red-500 text-left">
        <h1 class="text-2xl font-semibold">WebContent</h1>
        <p class="text-lg font-semibold text-white p-0 m-0 py-2">Anmod om adgang!</p>
        </div>

        <div class="pb-2 px-4 rounded-lg text-white bg-gray-900 min-w-[300px] max-w-lg shadow-black shadow-lg">
        <div class="grid w-full" @keyup.enter="handleRequest()">
            <div class="grid pt-2 w-full">
                <p class="text-left p-0 py-1">E-mail </p>
                <input v-model="email" type="email" class="input" />
            </div>
            <!-- <div class="grid pb-2 w-full">
                <p class="text-left p-0 py-1">Kodeord</p>
                <input v-model="password" type="password" class="input" />
            </div> -->
            <div class="flex justify-between py-1 mt-1 text-base w-full">
                <button @click="handleRequest()" class="bg-green-500 p-2 rounded-lg w-1/2 mr-1 hover:bg-green-600 duration-200">Anmod</button>
                <button @click="emit('goBack')" class="bg-red-500 p-2 rounded-lg w-1/2 ml-1 hover:bg-red-600 duration-200">Tilbage</button>
            </div>
            <div v-if="error" class="text-red-600 text-base">
                * {{ error }}
            </div>
        </div>
        </div>
    </section>
</template>

<style scoped>
.input {
    @apply rounded-lg bg-slate-600 p-1 text-lg font-normal
}
</style>