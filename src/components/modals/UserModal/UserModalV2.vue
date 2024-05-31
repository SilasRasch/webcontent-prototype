<script setup>
import MyModal from '../MyModal.vue';

import { ref } from 'vue';
import { store } from '@/store/store';
import { useRouter } from 'vue-router';
import { auth } from '@/store/auth';

const currTab = ref(0)

const handleLogout = () => {
    store.toggleLoginModal()
    auth.logOut()
    router.push("/")
}

const router = useRouter()

const showDisplayNameSetting = ref(false)
const showEmailSetting = ref(false)
const showPasswordSetting = ref(false)

const newPswd = ref('')
const newPswdConfirm = ref('')
</script>

<template>
    <MyModal>
        <template #trigger><span class="fa fa-user-o text-xl"></span></template>
        <template #default>
            <div v-show="currTab === 0" class="grid w-full mt-2 gap-4">
                <div class="flex">
                    <img src="https://webcontent.dk/wp-content/uploads/2024/01/cropped-logo-hjemmeside-1-32x32.png"
                    class="mx-2" />
                    <p class="text-left p-0 py-1">{{ auth.loggedInUser.email }}</p>
                </div>
                <hr />
                <div class="grid gap-2">
                    <div class="flex items-center justify-between bg-gray-900 p-2 rounded-lg px-3 hover:bg-opacity-80 duration-200 cursor-pointer"
                    @click="currTab = 1">
                        <div class="flex text-center">
                            <span class="cursor-pointer fa fa-cog fa-2x min-w-10"></span>
                            <p class="text-base mx-1">Indstillinger</p>
                        </div>  
                        <span class="fa fa-angle-right fa-2x"></span>
                    </div>
                    <div class="flex items-center justify-between bg-gray-900 p-2 rounded-lg px-3 hover:bg-opacity-80 duration-200 cursor-pointer"
                    @click="currTab = 2">
                        <div class="flex text-center">
                            <span class="cursor-pointer fa fa-question fa-2x min-w-10"></span>
                            <p class="text-base mx-1">Hjælp og spørgsmål</p>
                        </div>  
                        <span class="fa fa-angle-right fa-2x"></span>
                    </div>
                    <div @click="handleLogout" class="flex items-center justify-between bg-gray-900 p-2 rounded-lg px-3 hover:bg-red-500 duration-500 cursor-pointer">
                        <div class="flex text-center">
                            <span @click="handleLogout" class="cursor-pointer fa fa-sign-out fa-2x min-w-10"></span>
                            <p class="text-base">Log ud</p>
                        </div>  
                        <span class="fa fa-angle-right fa-2x"></span>
                    </div>
                </div>
            </div>

            <!-- Settings page -->

            <div v-show="currTab === 1" class="grid w-full mt-2 gap-4">
                <div class="flex cursor-pointer" @click="currTab = 0">
                    <span class="fa fa-angle-left fa-2x"></span>
                    <p class="text-left p-0 py-1 mx-3">Tilbage</p>
                </div>
                <hr />
                <div class="grid gap-2">
                    <div class="flex flex-col bg-gray-900 p-2 rounded-lg px-3 hover:bg-opacity-80 duration-200 cursor-pointer">
                        <div class="flex justify-between w-full" @click="showDisplayNameSetting = !showDisplayNameSetting">
                            <div class="flex text-center">
                                <span class="cursor-pointer fa fa-id-card-o fa-2x min-w-10"></span>
                                <p class="text-base">Skift brugernavn</p>
                            </div>  
                            <span class="fa fa-angle-down fa-2x"></span>
                        </div>
                        <div v-if="showDisplayNameSetting" class="flex">
                            <input placeholder="Indast nyt brugernavn" class="w-full p-2 my-2 rounded-l-xl text-base text-black" />
                            <button class="bg-green-500 px-4 py-1 rounded-r-xl text-base my-2 fa fa-check hover:bg-green-600 duration-200"></button>
                        </div>
                    </div>
                    <div class="flex flex-col bg-gray-900 p-2 rounded-lg px-3 hover:bg-opacity-80 duration-200 cursor-pointer">
                        <div class="flex justify-between w-full" @click="showEmailSetting = !showEmailSetting">
                            <div class="flex text-center">
                                <span class="cursor-pointer fa fa-envelope-o fa-2x min-w-10"></span>
                                <p class="text-base">Skift email</p>
                            </div>  
                            <span class="fa fa-angle-down fa-2x"></span>
                        </div>
                        <div v-if="showEmailSetting" class="flex">
                            <input placeholder="Indast ny e-mail" class="w-full p-2 my-2 rounded-l-xl text-base text-black" />
                            <button class="bg-green-500 px-4 py-1 rounded-r-xl text-base my-2 fa fa-check hover:bg-green-600 duration-200"></button>
                        </div>
                    </div>
                    <div class="flex flex-col bg-gray-900 p-2 rounded-lg px-3 hover:bg-opacity-80 duration-200 cursor-pointer">
                        <div class="flex justify-between w-full" @click="showPasswordSetting = !showPasswordSetting">
                            <div class="flex text-center">
                                <span class="cursor-pointer fa fa-lock fa-2x min-w-10"></span>
                                <p class="text-base">Skift kodeord</p>
                            </div>  
                            <span class="fa fa-angle-down fa-2x"></span>
                        </div>
                        <div v-if="showPasswordSetting" class="grid">
                            <div class="flex">
                                <input v-model="newPswd" type="password" placeholder="Indast nyt kodeord" class="w-full p-2 mt-2 rounded-xl text-base text-black" />
                            </div>
                            <div class="flex">
                                <input v-model="newPswdConfirm" type="password" placeholder="Gentag nyt kodeord" class="w-full p-2 my-2 rounded-l-xl text-base text-black" />
                                <button class="bg-green-500 px-4 py-1 rounded-r-xl text-base my-2 fa fa-check hover:bg-green-600 duration-200" 
                                :disabled="newPswd.length === 0 || newPswd !== newPswdConfirm"
                                @click="() => console.log('Confirmed')"></button>
                            </div>
                        </div>
                    </div>
                    <div v-show="auth.loggedInUser.email === 'admin'" class="flex flex-col bg-gray-900 p-2 rounded-lg px-3 hover:bg-opacity-80 duration-200 cursor-pointer">
                        <div class="flex justify-between w-full">
                            <div class="flex text-center">
                                <span class="cursor-pointer fa fa-key fa-2x min-w-10"></span>
                                <p class="text-base">Skift rolle</p>
                            </div>  
                            <select class="bg-slate-800 bg-opacity-50 p-2 rounded-lg hover:bg-opacity-75 duration-200" v-model="auth.loggedInUser.roles[0]">
                                <option class="role-option">Bruger</option>
                                <option class="role-option">Creator</option>
                                <option class="role-option">Admin</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <!-- FAQ -->

            <div v-show="currTab === 2" class="grid w-full mt-2 gap-4">
                <div class="flex cursor-pointer" @click="currTab = 0">
                    <span class="fa fa-angle-left fa-2x"></span>
                    <p class="p-0 py-1 mx-3">Tilbage</p>
                </div>
                <hr />
                <div class="grid gap-2 md:max-w-[400px]">
                    <div class="flex flex-col bg-gray-900 p-2 rounded-lg px-3 text-left">
                        <p class="text-base">Kan jeg regne med den estimerede pris?</p>
                        <p class="text-sm">Den estimerede pris er ikke endegyldig, og den endelige pris kommer meget an på, om der nogle særlige forhold ved præcis dit projekt.</p>
                    </div>
                    <div class="flex flex-col bg-gray-900 p-2 rounded-lg px-3 text-left">
                        <p class="text-base">Hvor lang tid går der før min bestilling bekræftes?</p>
                        <p class="text-sm">Der plejer maximum at tage 2 hverdage for os at bekræfte en ny bestilling.</p>
                    </div>
                    <div class="flex flex-col bg-gray-900 p-2 rounded-lg px-3 text-left">
                        <p class="text-base">Kan jeg annullere min bestilling?</p>
                        <p class="text-sm">Ja, og nej. Det kommer an på hvor langt vi er i forløbet. Tag kontakt til os, så ser vi på det.</p>
                    </div>
                    <div class="flex flex-col bg-red-500 p-2 rounded-lg px-3 cursor-pointer hover:bg-red-600 duration-200">
                        <p class="text-base text-center">Vis flere</p>
                    </div>
                </div>
            </div>
        </template>
    </MyModal>
</template>


<style scoped>
.input {
    @apply bg-slate-600 text-base p-1 px-2 font-normal w-full rounded-lg
}

.role-option {
    @apply bg-slate-800 bg-opacity-50
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