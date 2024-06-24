<script setup>
import { ref } from 'vue';
import { auth } from '@/store/auth';
import { useEmailAPI } from '@/store/api/emailApi';

const emit = defineEmits(["changeTab"])
const emailAPI = useEmailAPI()
const reportText = ref('')

const sendReport = () => {
    emailAPI.postReport({ userEmail: auth.loggedInUser.email, reportMessage: reportText.value }).then(() => {
        reportText.value = ''
        emit("changeTab", 0)
    })
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
            <div class="flex flex-col bg-gray-900 p-2 rounded-lg px-3 hover:bg-opacity-80 duration-200">
                <div class="flex justify-between w-full">
                    <div class="flex text-center">
                        <span class="fa fa-exclamation-triangle fa-2x min-w-10"></span>
                        <p class="text-base">Rapportér problem</p>
                    </div>  
                </div>
                <textarea v-model="reportText" class="w-full p-2 my-2 rounded-lg text-base text-black" rows="3" placeholder="Hvad er der sket?"></textarea>
                <button @click="sendReport" :disabled="reportText === ''" class="bg-green-500 px-4 py-1 rounded-xl text-base hover:bg-green-600 duration-200">Send</button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>