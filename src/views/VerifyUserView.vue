<script setup>
import InputWrapper from '@/components/Input/InputWrapper.vue';
import { useAuthAPI } from '@/store/api/authApi';
import { validatePassword } from '@/store/validation';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()
const api = useAuthAPI()
let token = route.query["token"]

const error = ref('')
const password = ref('')
const confirmPassword = ref('')

const SendVerification = () => {
    if (password.value === confirmPassword.value && validatePassword(password.value)) {
        api.verifyUser({ verificationToken: token, password: password.value }).then(() => {
            password.value = ''
            confirmPassword.value = ''
            router.push("/")
        })
        .catch((err) => error.value = err.response.data)
    }
}
</script>

<template>
    <div v-if="token" class="grid justify-center">
        <h1 class="text-center font-semibold text-2xl my-5">Lad os færdiggøre din nye bruger</h1>

        <InputWrapper>
            <div class="grid w-full justify-center">
                <p class="text-left p-0 py-1">Indtast dit kodeord</p>
                <input v-model="password" type="password" class="input max-w-96" />
            </div>
        </InputWrapper>
        <InputWrapper>
            <div class="grid w-full justify-center">
                <p class="text-left p-0 py-1">Bekræft kodeord</p>
                <input v-model="confirmPassword" type="password" class="input max-w-96" />
            </div>
        </InputWrapper>
        <div class="flex justify-center w-full">
            <button @click="SendVerification" :disabled="password !== confirmPassword || validatePassword(password)" class="bg-green-500 p-2 hover:bg-green-600 duration-200 rounded-lg mt-2 max-w-52 w-full">Bekræft</button>
        </div>
        <p v-if="error" class="text-red-500 font-semibold">* {{ error }}</p>

    </div>
</template>

<style scoped>
.input {
    @apply rounded-lg bg-slate-600 p-1 text-lg font-normal
}
</style>