<script setup>
import MyModal from '../MyModal.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '@/store/auth';
import UserModalReport from './UserModalReport.vue';
import UserModalFAQ from './UserModalFAQ.vue';
import UserModalSettings from './UserModalSettings.vue';

const router = useRouter()
const currTab = ref(0)

const handleLogout = () => {
    auth.logOut().then(() => router.push("/"))
}

const resetTabs = () => {
    currTab.value = 0
}
</script>

<template>
    <MyModal>
        <template #trigger><span class="fa fa-user-o text-xl" @click="resetTabs"></span></template>
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
                            <span class="cursor-pointer fa fa-question-circle-o fa-2x min-w-10"></span>
                            <p class="text-base mx-1">Hjælp og spørgsmål</p>
                        </div>  
                        <span class="fa fa-angle-right fa-2x"></span>
                    </div>
                    <div class="flex items-center justify-between bg-gray-900 p-2 rounded-lg px-3 hover:bg-opacity-80 duration-200 cursor-pointer"
                    @click="currTab = 3">
                        <div class="flex text-center">
                            <span class="cursor-pointer fa fa-exclamation-triangle fa-2x min-w-10"></span>
                            <p class="text-base mx-1">Rapportér problem</p>
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

            <UserModalSettings v-show="currTab === 1" @change-tab="n => currTab = n" />

            <!-- FAQ -->

            <UserModalFAQ v-show="currTab === 2" @change-tab="n => currTab = n" />

            <!-- Report -->

            <UserModalReport v-show="currTab === 3" @change-tab="n => currTab = n" />
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