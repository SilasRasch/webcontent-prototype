<script setup>
import ToolTip from '@/components/Input/ToolTip.vue';
import { auth } from '@/store/auth';
import { ref } from 'vue';

const email = ref('')
const password = ref('')
const error = ref('')

const handleLogin = async () => {
  if (email.value !== '' && password.value !== '') {
    auth.login(email.value, password.value).then(() => {
      email.value = ''
      password.value = ''
      error.value = ''
    })
    .catch(() =>  {
      error.value = "Forkert email eller kodeord"
      password.value = ''
    })
  }
}
</script>

<template>
    <section class="flex justify-center gap-2 md:gap-8 items-center py-24">
        <div class="text-red-500 text-left">
        <h1 class="text-2xl font-semibold">WebContent</h1>
        <p class="text-lg font-semibold text-white p-0 m-0 py-2">Alt-i-en platform til content!</p>
        </div>

        <div class="pb-2 px-4 rounded-lg text-white bg-gray-900 min-w-[300px] max-w-lg shadow-black shadow-lg">
        <div class="grid w-full" @keyup.enter="handleLogin()">
            <div class="grid pt-2 w-full">
                <p class="text-left p-0 py-1">E-mail <ToolTip class="bg-gray-800" label="i">Test credentials <br> Brugernavn: admin <br> Kodeord: test</ToolTip> </p>
                <input v-model="email" type="email" class="input" />
            </div>
            <div class="grid w-full">
                <p class="text-left p-0 py-1">Kodeord</p>
                <input v-model="password" type="password" class="input" />
            </div>
            <div class="flex justify-between py-2 text-base w-full">
                <button @click="handleLogin()" class="bg-green-500 p-2 rounded-lg w-1/2 mr-1 hover:bg-green-600 duration-200">Log ind</button>
                <a href="https://calendly.com/webcontentdk" target="_blank" class="bg-red-500 p-2 rounded-lg w-1/2 ml-1 hover:bg-red-600 duration-200">Få adgang</a>
                <!-- <button @click="handleShowCreate()" class="bg-red-500 p-2 rounded-lg w-1/2 ml-1 hover:bg-red-600 duration-200">Få adgang</button> -->
            </div>
            <div class="text-base cursor-pointer hover:text-blue-500 duration-300">Glemt kodeord?</div>
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