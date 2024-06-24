<script setup>
import { ref } from 'vue';
import { auth } from '@/store/auth';
import { useUserAPI } from '@/store/api/userApi';
import { validateEmail, validateDisplayName, validatePassword } from '@/store/validation';

const emit = defineEmits(["changeTab"])
const api = useUserAPI()

const showDisplayNameSetting = ref(false)
const showEmailSetting = ref(false)
const showPasswordSetting = ref(false)
const showPhoneSetting = ref(false)
const pswdError = ref('')

const newDisplayName = ref('')
const updateDisplayName = () => {
    if (validateDisplayName(newDisplayName.value)) {
        api.putUser(auth.loggedInUser.id, { ...auth.loggedInUser, displayName: newDisplayName.value,password: 'null' }).then(() => {
            auth.refreshToken().then(() => {
                newDisplayName.value = ''
                showDisplayNameSetting.value = false
            })
        })
    }   
}

const newPhone = ref('')
const updatePhone = () => {
    if (validateDisplayName(newPhone.value)) {
        api.putUser(auth.loggedInUser.id, { ...auth.loggedInUser, phone: newPhone.value, password: 'null' }).then(() => {
            auth.refreshToken().then(() => {
                newPhone.value = ''
                showPhoneSetting.value = false
            })
        })
    }   
}

const newEmail = ref('')
const updateEmail = () => {
    if (validateEmail(newEmail.value)) {
        api.putUser(auth.loggedInUser.id, { ...auth.loggedInUser, email: newEmail.value, password: 'null' }).then(() => {
            localStorage.setItem("user", newEmail.value)
            auth.refreshToken().then(() => {
                newEmail.value = ''
                showEmailSetting.value = false
            })
        })
    }
}

const newPswd = ref('')
const newPswdConfirm = ref('')
const updatePassword = () => {
    if (newPswd.value === newPswdConfirm.value) {
        if (validatePassword(newPswd.value)) {
            api.changePassword(auth.loggedInUser.id, { password: newPswd.value }).then(() => {
                auth.refreshToken().then(() => {
                    newPswd.value = ''
                    newPswdConfirm.value = ''
                    showPasswordSetting.value = false
                    pswdError.value = ''
                })
            })
        } else {
            pswdError.value = 'Kodeordet lever ikke op til kravene'
        }
    } else {
        pswdError.value = 'Kodeordene matcher ikke'
    }
}
</script>

<template>
    <div class="grid w-full mt-2 gap-4">
        <div class="flex cursor-pointer" @click="emit('changeTab', 0)">
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
                    <input v-model="newDisplayName" :placeholder="auth.loggedInUser.displayName" class="w-full p-2 my-2 rounded-l-xl text-base text-black" />
                    <button @click="updateDisplayName" :disabled="validateDisplayName(newEmail)" class="bg-green-500 px-4 py-1 rounded-r-xl text-base my-2 fa fa-check hover:bg-green-600 duration-200"></button>
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
                    <input v-model="newEmail" :placeholder="auth.loggedInUser.email" class="w-full p-2 my-2 rounded-l-xl text-base text-black" />
                    <button @click="updateEmail" :disabled="validateEmail(newEmail)" class="bg-green-500 px-4 py-1 rounded-r-xl text-base my-2 fa fa-check hover:bg-green-600 duration-200"></button>
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
                        :disabled="newPswd.length < 1 || newPswdConfirm.length < 1"
                        @click="updatePassword"></button>
                    </div>
                    <div v-if="pswdError" class="flex justify-center">
                        <div class="text-red-600 break-words w-64 text-center text-sm">* {{ pswdError }}</div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col bg-gray-900 p-2 rounded-lg px-3 hover:bg-opacity-80 duration-200 cursor-pointer">
                <div class="flex justify-between w-full" @click="showPhoneSetting = !showPhoneSetting">
                    <div class="flex text-center">
                        <span class="cursor-pointer fa fa-phone fa-2x min-w-10"></span>
                        <p class="text-base">Skift telefonnummer</p>
                    </div>  
                    <span class="fa fa-angle-down fa-2x"></span>
                </div>
                <div v-if="showPhoneSetting" class="grid">
                    <div class="flex">
                        <input v-model="newPhone" :placeholder="auth.loggedInUser.phone" class="w-full p-2 my-2 rounded-l-xl text-base text-black" />
                        <button class="bg-green-500 px-4 py-1 rounded-r-xl text-base my-2 fa fa-check hover:bg-green-600 duration-200" 
                        :disabled="newPhone.length < 8"
                        @click="updatePhone"></button>
                    </div>
                </div>
            </div>
            <div v-if="auth.originalRole.includes('Admin')" class="flex flex-col bg-gray-900 p-2 rounded-lg px-3 hover:bg-opacity-80 duration-200 cursor-pointer">
                <div class="flex justify-between w-full">
                    <div class="flex text-center">
                        <span class="cursor-pointer fa fa-key fa-2x min-w-10"></span>
                        <p class="text-base">Skift rolle</p>
                    </div>  
                    <select class="bg-slate-800 text-base text-center bg-opacity-50 p-2 rounded-lg hover:bg-opacity-75 duration-200" v-model="auth.loggedInUser.roles[0]">
                        <option class="role-option">Bruger</option>
                        <option class="role-option">Creator</option>
                        <option class="role-option">Admin</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>