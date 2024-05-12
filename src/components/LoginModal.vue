<script setup>
import { ref } from 'vue';
import { store } from '@/store/store';
import { useRouter } from 'vue-router';

const email = ref('')
const pswd = ref('')

function handleLogin() {
    store.isLoggedIn = true
    store.loggedInUser = {
        email: email,
        role: 'Bruger',
    }
    store.role = 'Bruger' // Deprecated

    store.toggleLoginModal()
}

const router = useRouter()

function handleGoToCreate() {
    router.push('/opret')
    store.toggleLoginModal()
}
</script>

<template>
    <div>
        <span @click="store.toggleLoginModal" class="cursor-pointer fa fa-user-o text-xl"></span>

        <Transition>
            <div v-if="store.showLoginModal" @click.self="store.toggleLoginModal" class="z-50 absolute bg-black w-[100vw] h-[100vh] top-0 left-0 bg-opacity-60 grid justify-center items-center">
                <div
                class="p-2 px-4 rounded-lg text-white bg-slate-900
                min-w-fit w-[21rem] text-center min-h-fit md:mb-96 mb-72">
                    Log ind
                    <div class="grid w-full">
                        <div class="grid pt-2 w-full">
                            <p class="text-left p-0 py-1">E-mail</p>
                            <input v-model="email" type="email" class="input" />
                        </div>
                        <div class="grid pb-2 w-full">
                            <p class="text-left p-0 py-1">Kodeord</p>
                            <input v-model="pswd" type="password" class="input" />
                        </div>
                        <div class="flex justify-between py-1 text-base w-full">
                            <button @click="handleLogin" class="bg-green-500 p-2 rounded-lg w-1/2 mr-1 hover:bg-green-600 duration-200">Log ind</button>
                            <button @click="handleGoToCreate" class="bg-red-500 p-2 rounded-lg w-1/2 ml-1 hover:bg-red-600 duration-200">Opret</button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.triangle {
    width: 0; 
    height: 0; 
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    
    border-bottom: 5px solid black;
}

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
  transition: all 0.4s ease-in-out;
}

.v-leave-from {
    z-index: -100;
    opacity: 0;
}

.v-leave-to {
    opacity: 0;
}

.v-leave-active {
    transition: all 0.4s ease-in-out;
}

.v-move {
    opacity: 0;
    transition: all 0.4s ease-in-out;
}
</style>