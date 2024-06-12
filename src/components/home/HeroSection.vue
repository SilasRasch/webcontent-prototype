<script setup>
import { auth } from '@/store/auth';
import { RouterLink } from 'vue-router'

const emit = defineEmits(["showLogin", "showCreate"])
</script>

<template>
    <section class="flex flex-col justify-center items-center text-center gap-8 py-24">
        <!-- <h1 class="md:text-5xl sm:text-3xl text-2xl text-red-500 font-bold max-w-[48rem]">WebContents platform er en all-in-one content løsning.</h1> -->
        <h1 class="md:text-5xl sm:text-3xl text-2xl text-red-500 font-bold max-w-[48rem]">Velkommen til WebContents bestillingsplatform</h1>
        <h3 class="md:text-2xl sm:text-lg text-white font-bold">Lad os komme i gang!</h3>
        <div v-if="auth.isUser()" class="flex justify-center gap-2">
            <RouterLink to="/bestil" class="flex justify-center">
                <p class="p-2 px-4 text-white bg-red-500 rounded-full font-semibold hover:bg-red-600 duration-200">Opret nyt projekt</p>
            </RouterLink>
            <RouterLink to="/min-side" class="flex justify-center">
                <p class="p-2 px-4 text-white bg-red-300 rounded-full font-semibold hover:bg-red-400 duration-200">Gå til dashboard</p>
            </RouterLink>
        </div>
        <RouterLink v-else-if="auth.isAdmin()" to="/admin" class="flex justify-center">
            <p class="p-2 px-4 text-white bg-red-500 rounded-full font-semibold hover:bg-red-600 duration-200">Gå til dashboard</p>
        </RouterLink>
        <RouterLink v-else-if="auth.isCreator()" to="/min-side" class="flex justify-center">
            <p class="p-2 px-4 text-white bg-red-500 rounded-full font-semibold hover:bg-red-600 duration-200">Gå til dashboard</p>
        </RouterLink>
        <div v-else class="flex justify-center gap-2">
            <button @click="emit('showLogin')" class="p-2 px-4 text-white bg-red-500 rounded-full font-semibold hover:bg-red-600 duration-200 min-w-28">Log ind</button>
            <a href="https://calendly.com/webcontentdk/30min" target="_blank" class="p-2 px-4 text-white bg-red-300 rounded-full font-semibold hover:bg-red-400 duration-200 min-w-28">Få adgang</a>
            <!-- <button @click="emit('showCreate')" class="p-2 px-4 text-white bg-red-300 rounded-full font-semibold hover:bg-red-400 duration-200 min-w-28">Få adgang</button> -->
        </div>
    </section>
</template>