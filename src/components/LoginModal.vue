<script setup>
import { ref } from 'vue';
import { store } from '@/store/store';
import { useRouter } from 'vue-router';
import { auth } from '@/store/auth';

const email = ref('')
const password = ref('')

const error = ref('')

const handleLogin = async () => {
    let success
    auth.login(email.value, password.value).then(res => success = res).then(() => {
        if (success) {
            store.toggleLoginModal()
            email.value = ''
            password.value = ''
            error.value = ''
        }
        else {
            error.value = "Forkert email eller kodeord"
            password.value = ''
        }
    })
}

const handleLogout = () => {
    store.toggleLoginModal()
    auth.logOut()
    router.push("/")
}

const router = useRouter()

const handleGoToCreate = () => {
    router.push('/opret')
    store.toggleLoginModal()
}
</script>

<template>
    <div>
        <span @click="store.toggleLoginModal" class="cursor-pointer fa fa-user-o text-xl"></span>

        <Transition>
            <div v-if="store.showLoginModal" @click.self="store.toggleLoginModal" class="z-50 absolute w-[100vw] h-[100vh] top-0 left-0">
                <div v-if="!auth.isLoggedIn"
                class="p-2 px-4 rounded-lg text-white bg-gray-900 
                min-w-fit w-[21rem] text-center min-h-fit md:mb-96 mb-72 absolute right-2 top-20 shadow-2xl shadow-black">
                    Log ind
                    <div class="grid w-full">
                        <div class="grid pt-2 w-full">
                            <p class="text-left p-0 py-1">E-mail</p>
                            <input v-model="email" type="email" class="input" />
                        </div>
                        <div class="grid pb-2 w-full">
                            <p class="text-left p-0 py-1">Kodeord</p>
                            <input v-model="password" type="password" class="input" />
                        </div>
                        <div class="flex justify-between py-1 text-base w-full">
                            <button @click="handleLogin" class="bg-green-500 p-2 rounded-lg w-1/2 mr-1 hover:bg-green-600 duration-200">Log ind</button>
                            <button @click="handleGoToCreate" class="bg-red-500 p-2 rounded-lg w-1/2 ml-1 hover:bg-red-600 duration-200">Opret</button>
                        </div>
                        <div v-if="error" class="text-red-600 text-base">
                            * {{ error }}
                        </div>
                    </div>
                </div>
                <div v-else
                class="p-2 px-4 rounded-lg text-white bg-gray-800 
                min-w-fit w-[21rem] text-center min-h-fit md:mb-96 absolute top-[6vh] right-0 shadow-2xl shadow-black pb-4">
                    <div class="grid w-full mt-2 gap-4">
                        <div class="flex">
                            <img src="https://webcontent.dk/wp-content/uploads/2024/01/cropped-logo-hjemmeside-1-32x32.png"
                            class="mx-2" />
                            <p class="text-left p-0 py-1">{{ auth.loggedInUser.email }}</p>
                            <!-- <p class="text-left p-0 py-1">info@webcontent.dk</p> -->
                        </div>
                        <hr />
                        <div class="grid gap-1">
                            <div class="flex items-center justify-between bg-gray-900 p-2 rounded-lg px-3 hover:bg-opacity-80 duration-200 cursor-pointer">
                                <div class="flex text-center">
                                    <span class="cursor-pointer fa fa-cog fa-2x min-w-10"></span>
                                    <p class="text-base mx-1">Indstillinger</p>
                                </div>  
                                <span class="fa fa-angle-right fa-2x"></span>
                            </div>
                            <div class="flex items-center justify-between bg-gray-900 p-2 rounded-lg px-3 hover:bg-opacity-80 duration-200 cursor-pointer">
                                <div class="flex text-center">
                                    <span class="cursor-pointer fa fa-question fa-2x min-w-10"></span>
                                    <p class="text-base mx-1">Hjælp og spørgsmål</p>
                                </div>  
                                <span class="fa fa-angle-right fa-2x"></span>
                            </div>
                            <div @click="handleLogout" class="flex items-center justify-between bg-gray-900 p-2 rounded-lg px-3 hover:bg-opacity-80 duration-200 cursor-pointer">
                                <div class="flex text-center">
                                    <span @click="handleLogout" class="cursor-pointer fa fa-sign-out fa-2x min-w-10"></span>
                                    <p class="text-base">Log ud</p>
                                </div>  
                                <span class="fa fa-angle-right fa-2x"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
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
  transition: all 0.2s ease-in-out;
}

.v-leave-from {
    z-index: -100;
    opacity: 0;
}

.v-leave-to {
    opacity: 0;
}

.v-leave-active {
    transition: all 0.2s ease-in-out;
}

.v-move {
    opacity: 0;
    transition: all 0.2s ease-in-out;
}
</style>