<script setup>
import { computed, ref } from 'vue';
import MyModal from '../MyModal.vue';

const chats = ref([
    { message: "Hej", direction: "in" },
    { message: "Hvordan går det?", direction: "out" },
    { message: "Det går godt", direction: "in" },
    { message: "Hvad med dig?", direction: "in" },
])

const contacts = ref([
    { name: "Mathias H.", company: "WebContent" },
    { name: "Silas H. R.", company: "WebContent Udvikling" },
    { name: "Kevin M.", company: "Haas" },
    { name: "Hugh J.", company: "DBU" },
    { name: "Mike H.", company: "Fætter BR" },
])

const message = ref('')

const sendChat = () => {
    if (message.value !== '') {
        chats.value.push({ message: message.value, direction: "out" })
        message.value = ''
    }
}

const selectedContact = ref(undefined)

const selectContact = (contact) => {
    if (selectedContact.value !== contact) {
        selectedContact.value = contact
    } else {
        selectedContact.value = ''
    }
}

const searchTerm = ref('')

const shownContacts = computed(() => {
    return searchTerm.value === '' ? contacts.value : contacts.value.filter(x => x.name.toLowerCase().includes(searchTerm.value.toLowerCase()))
})

const resetContext = () => {
    selectedContact.value = undefined
}

</script>

<template>
    <MyModal>
        <template #trigger><span class="fa fa-comments-o text-xl" @click="resetContext"></span></template>
        <template #default>
            <div class="flex gap-2 min-h-fit max-h-[80vh]">
                <div class="grid content-start w-full mt-2 gap-4">
                    <div class="grid gap-4 h-fit">
                        <p class="m-0 p-0">Chat</p>
                        <p class="-mt-4 p-0 text-sm">Hvem vil du chatte med?</p>
                        <hr>
                    </div>
                    
                    <div class="grid gap-2 min-h-96 content-start">
                        <div class="flex items-center bg-gray-900 rounded-lg h-fit">
                            <input v-model="searchTerm" class="input" placeholder="Søg efter en person...">
                            <span class="fa fa-search mr-3"></span>
                        </div>

                        <!-- User Card -->
                        
                        <div v-for="contact, index in shownContacts" :key="index"  class="h-fit flex items-center justify-between min-w-72 bg-gray-900 p-2 rounded-lg px-3 hover:bg-opacity-80 duration-200 cursor-pointer"
                        @click="selectContact(contact)">
                            <div class="flex">
                                <img src="https://webcontent.dk/wp-content/uploads/2024/01/cropped-logo-hjemmeside-1-32x32.png" class="mr-2" height="56" width="56" />
                                <div class="flex flex-col mx-1">
                                    <p class="text-left p-0 pt-1">{{ contact.name }}</p>
                                    <p class="text-left p-0 pb-1 text-sm">{{ contact.company }}</p>
                                </div>
                            </div>  
                            <span v-if="selectedContact" class="fa fa-2x" :class="selectedContact === contact ? 'fa-angle-left': 'fa-angle-right'"></span>
                            <span v-else class="fa fa-angle-right fa-2x"></span>
                        </div>
                    </div>
                </div>

                <div v-if="selectedContact" class="grid content-between w-full mt-2 min-w-[350px]">
                    <div class="grid gap-4">
                        <p class="m-0 p-0">{{ selectedContact.name }}</p>
                        <p class="-mt-4 p-0 text-sm">{{ selectedContact.company }}</p>
                        <hr>
                    </div>
                    
                    <!-- Chats -->
                    <div class="flex flex-col gap-2 mt-4 mb-12 scrollbar">
                        
                        <div class="flex flex-col gap-2">
                            <span v-for="chat, index in chats" :key="index"
                            :class="chat.direction === 'in' ? 'chat-in' : 'chat-out'">
                                {{ chat.message }}
                            </span>
                        </div>
                        
                    </div>
                    <div class="flex items-center bg-gray-900 rounded-lg absolute bottom-4 right-4 min-w-[350px]">
                        <input @keyup.enter="sendChat" v-model="message" class="input" placeholder="Hvad vil du sige?">
                        <span @click="sendChat" class="fa fa-paper-plane-o mr-3 cursor-pointer"></span>
                    </div>
                </div>
            </div>
            
            
        </template>
    </MyModal>
</template>


<style scoped>
.input {
    @apply bg-gray-900 text-base p-2 pl-3 font-normal w-full rounded-l-lg
}

.chat-in {
    @apply bg-gray-900 w-fit p-2 px-4 text-base rounded-2xl break-words max-w-[280px] text-left
}

.chat-out {
    @apply self-end bg-red-500 w-fit p-2 px-4 text-base rounded-2xl break-words max-w-[280px] text-left
}

.scrollbar {
  overflow-y: scroll;
  scrollbar-color: grey rgba(94, 94, 94, 0.15);
  scrollbar-width: thin;
}
</style>