<script setup>
import { auth } from '@/store/auth';
</script>

<template>
    <div class="grid justify-center text-center m-4">
        <h1 class="text-3xl font-semibold">Få adgang</h1>

        <hr class="text-black bg-black opacity-50 h-0.5 m-3 mb-1" />

        <h1 v-if="!auth.isAdmin()" class="text-xl m-2 bg-slate-800 p-4 rounded-lg">
            Platformen er under opbygning, <br>
            vend tilbage igen senere...
        </h1>
        <div v-else class="bg-slate-800 rounded-lg p-4 md:w-[30rem]">
            <h1 class="text-xl">Opret ny bruger</h1>
            <div class="grid gap-2 my-4">
                <p class="m-0 p-0 text-left">Navn</p>
                <input type="text" class="w-full p-2 px-3 bg-slate-900 rounded-xl" placeholder="John Smith">
            </div>
            <div class="grid gap-2 my-4">
                <p class="m-0 p-0 text-left">Email</p>
                <input type="email" class="w-full p-2 px-3 bg-slate-900 rounded-xl" placeholder="bruger@email.dk">
            </div>
            <button class="bg-green-600 bg-opacity-50 hover:bg-opacity-80 duration-200 p-2 px-4 rounded-lg font-semibold">{{ auth.isAdmin() ? 'Invitér' : 'Anmod om adgang' }}</button>
        </div>
    </div>
</template>