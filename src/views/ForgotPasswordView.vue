<script setup>
import InputWrapper from '@/components/Input/InputWrapper.vue';
import { useUserAPI } from '@/store/api/userApi';
import { validateEmail } from '@/store/validation';
import { ref } from 'vue';

const api = useUserAPI()

const email = ref('')
const isSent = ref(false)
const error = ref('')
const handleSend = () => {
    api.forgotPassword({ email: email.value }).then(() => {
        isSent.value = true 
    })
    .catch((err) => error.value = err.response.data)
}
</script>

<template>
    <TransitionGroup tag="div">
        <div v-if="!isSent" class="grid justify-center">
            <h1 class="text-center font-semibold text-2xl my-5">Glemt dit kodeord?</h1>

            <InputWrapper>
                <div class="grid w-full justify-center">
                    <p class="text-left p-0 py-1">Indtast din mail</p>
                    <input v-model="email" type="text" class="input max-w-96" />
                    <p v-if="error" class="text-red-500 font-semibold">* {{ error }}</p>
                </div>
            </InputWrapper>
            <button @click="handleSend" :disabled="!validateEmail(email)" class="bg-green-500 p-2 hover:bg-green-600 duration-200 rounded-lg mt-2">Send</button>
            
        </div>
        <div v-else class="grid justify-center my-5">
            <p class="text-center"><strong>Så er den klaret!</strong> <br> Du vil snarest få en mail med et link, så du kan lave et nyt kodeord. <br> Hvis du ikke kan finde eller ikke mener du har modtaget mailen, så husk tjekke spam mappen.</p>
        </div>
    </TransitionGroup>
</template>

<style scoped>
.input {
    @apply rounded-lg bg-slate-600 p-1 text-lg font-normal
}

.v-enter-from {
  opacity: 0;
}

.v-enter-to {
  opacity: 1;
}

.v-enter-active {
  transition: all 0.8s ease-in-out;
}

.v-leave-from {
    z-index: -100;
    opacity: 0;
}

.v-leave-to {
    opacity: 0;
}

.v-leave-active {
    position: absolute;
}

.v-move {
    z-index: -100;
    opacity: 0;
}
</style>