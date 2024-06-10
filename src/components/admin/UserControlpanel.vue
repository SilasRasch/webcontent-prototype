<script setup>
import DoubleInput from '@/components/Input/DoubleInput.vue';
import SingleSelect from '@/components/Input/SingleSelect.vue';
import { useAuthAPI } from '@/store/api/authApi';
import { useCreatorAPI } from '@/store/api/creatorApi';
import { ref } from 'vue';
import UserPool from './UserPool.vue';

const api = useCreatorAPI()
const authAPI = useAuthAPI()
const creators = ref(null)

const fetchCreators = () => {
    api.getCreators().then((data) => creators.value = data).then((data) => { return data })
}

fetchCreators()
const showCreate = ref(false)
const currTab = ref(1)
const user = ref({ displayName: '', email: '', role: '', password: 'WebContentGenerate' })
const creatorProfile = ref({ location: '', speciality: '', handles: { instagram: '', tikTok: '', facebook: '', youTube: '', snapchat: '', pinterest: '' } })

const handleRegister = () => {
    if (user.value.role !== 'Creator') {
        authAPI.register(user.value)
    }
    else {
        const creator = {
            ...user.value,
            ...creatorProfile.value
        }
        
        authAPI.registerCreator(creator).then(() => {
            user.value = { displayName: '', email: '', role: '', password: 'WebContentGenerate' }
            creatorProfile.value = { location: '', speciality: '', handles: { instagram: '', tikTok: '', facebook: '', youTube: '', snapchat: '', pinterest: '' } }
            fetchCreators().then(() => {
                showCreate.value = false
            })
        })
    }
}
</script>

<template>
    <div class="grid justify-center text-center m-4 mt-0">
        <div v-if="!showCreate" class="grid">
            
            <div class="flex justify-center rounded-lg pb-1 mb-[-0.5rem] text-lg cursor-pointer">
                <span class="p-2 px-6 font-semibold rounded-tl-lg hover:bg-red-500" :class="{'bg-red-500': currTab === 1, 'bg-red-400': currTab !== 1}" @click="currTab = 1">Creators</span>
                <span class="p-2 px-6 font-semibold hover:bg-red-500" :class="{'bg-red-500': currTab === 2, 'bg-red-400': currTab !== 2}" @click="currTab = 2">Brugere</span>
                <span class="p-2 px-6 font-semibold rounded-tr-lg hover:bg-red-500" :class="{'bg-red-500': currTab === 3, 'bg-red-400': currTab !== 3}" @click="currTab = 3">Admins</span>
            </div>
            
            <TransitionGroup tag="div" class="flex justify-center bg-slate-800 rounded-lg [&>*]:max-w-[50rem]" name="dashboard">
                <UserPool v-if="currTab === 1" v-model="creators">Creators</UserPool>
                <UserPool v-if="currTab === 2" v-model="creators">Almindelige brugere</UserPool>
                <UserPool v-if="currTab === 3" v-model="creators">Administratorer</UserPool>
            </TransitionGroup>
        </div>

        <div v-else class="bg-slate-800 rounded-lg p-4 md:w-[36.5rem]">
            <h1 class="text-xl">Opret ny bruger</h1>
            <hr class="my-2 opacity-50">

            <DoubleInput v-model:firstInput="user.displayName" v-model:secondInput="user.email" required
            placeholder-one="Navnet på brugeren" placeholder-two="Brugerens email">
                <template v-slot:slotOne>Navn</template>
                <template v-slot:slotTwo>Email</template>
            </DoubleInput>

            <SingleSelect v-model="user.role" :items="['Bruger', 'Creator', 'Admin']" required>Rolle</SingleSelect>

            <!-- Creatorprofil -->
            <hr v-if="user.role === 'Creator'" class="text-black bg-black opacity-50 h-0.5 m-3" />
            <h1 v-if="user.role === 'Creator'" class="text-xl">Creatorprofil</h1>

            <DoubleInput v-if="user.role === 'Creator'" v-model:firstInput="creatorProfile.location" v-model:secondInput="creatorProfile.speciality" required
            placeholder-one="Brugerens lokation" placeholder-two="Hvad brugeren tilbyder">
                <template v-slot:slotOne>Lokation</template>
                <template v-slot:slotTwo>Speciale</template>
            </DoubleInput>

            <div v-if="user.role === 'Creator'">
                <DoubleInput placeholder-one="@Brugernavn" placeholder-two="Brugernavn" v-model:firstInput="creatorProfile.handles.instagram" v-model:secondInput="creatorProfile.handles.tikTok">
                    <template v-slot:slotOne>Instagram</template>
                    <template v-slot:slotTwo>TikTok</template>
                </DoubleInput>
                <DoubleInput placeholder-one="Brugernavn" placeholder-two="Brugernavn" v-model:firstInput="creatorProfile.handles.facebook" v-model:secondInput="creatorProfile.handles.youTube">
                    <template v-slot:slotOne>Facebook</template>
                    <template v-slot:slotTwo>YouTube</template>
                </DoubleInput>
                <DoubleInput placeholder-one="Brugernavn" placeholder-two="Brugernavn"  v-model:firstInput="creatorProfile.handles.snapchat" v-model:secondInput="creatorProfile.handles.pinterest">
                    <template v-slot:slotOne>Snapchat</template>
                    <template v-slot:slotTwo>Pinterest</template>
                </DoubleInput>
            </div>

            <hr class="text-black bg-black opacity-50 h-0.5 m-3" />
            <div class="flex justify-center"><button class="bg-red-400 w-full hover:bg-red-500 duration-200 p-2 mx-1 rounded-lg font-semibold"
                @click="handleRegister">Opret</button></div>
            
        </div>

        <div class="grid m-2 font-semibold justify-center">
            <div class="flex gap-2 w-fit">
                <button v-if="showCreate" class="bg-red-400 w-full rounded-lg p-2 hover:bg-red-500 duration-200" @click="showCreate = false">
                    Tilbage
                </button>
                <button v-else class="bg-red-400 w-full rounded-lg p-2 hover:bg-red-500 duration-200" @click="showCreate = true">
                    Opret ny bruger
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.scrollbar {
  overflow-y: scroll;
  scrollbar-color: grey rgba(94, 94, 94, 0.15);
  scrollbar-width: thin;
}

.dashboard-enter-from {
  opacity: 0;
}

.dashboard-enter-to {
  opacity: 1;
}

.dashboard-enter-active {
  transition: all 0.6s ease-in-out;
}

.dashboard-leave-from {
  opacity: 1;
}

.dashboard-leave-to {
  opacity: 0;
}

.dashboard-leave-active {
  transition: all 0.6s ease-in-out;
  position: absolute;
}

.dashboard-move {
  transition: all 0.6s ease-in-out;
}
</style>