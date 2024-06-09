<script setup>
import DoubleInput from '@/components/Input/DoubleInput.vue';
import SingleSelect from '@/components/Input/SingleSelect.vue';
import CreatorModal from '@/components/modals/CreatorModal/CreatorModal.vue';
import { useAuthAPI } from '@/store/api/authApi';
import { useCreatorAPI } from '@/store/api/creatorApi';
import { ref } from 'vue';

const api = useCreatorAPI()
const authAPI = useAuthAPI()
const creators = ref(null)
api.getCreators().then((data) => creators.value = data)

const showCreate = ref(false)

const showUsers = ref(false)
const showAdmins = ref(false)
const showCreators = ref(true)

const toggleCreate = () => {
    showCreate.value = true
}

const toggleUsers = () => {
    showCreate.value = false
}

const handleDelete = (id) => {
    console.log(`Delete ${id}`);
}

const user = ref({ displayName: '', email: '', role: '', password: 'WebContentGenerate' })

const creatorProfile = ref({ location: '', speciality: '', handles: { instagram: '', tikTok: '', facebook: '', youTube: '', snapchat: '', pinterest: '' } })

// Password skal på sigt genereres i backenden, og brugeren vil få en mail med login-informationer.
const handleRegister = () => {
    if (user.value.role !== 'Creator') {
        authAPI.register(user.value)
    }
    else {
        const creator = {
            ...user.value,
            ...creatorProfile.value
        }
        
        authAPI.registerCreator(creator)
    }
}
</script>

<template>
    <div class="grid justify-center text-center m-4 mt-0">
        <div class="grid bg-slate-800 rounded-lg p-2 md:w-[36.5rem]">
            <div class="flex gap-2">
                <button v-if="showCreate" class="bg-green-500 w-full rounded-lg p-2 hover:bg-green-600 duration-200" @click="toggleUsers">
                    Tilbage
                </button>
                <button v-else class="bg-green-500 w-full rounded-lg p-2 hover:bg-green-600 duration-200" @click="toggleCreate">
                    Opret ny bruger
                </button>
            </div>
        </div>

        
        <div v-if="!showCreate" class="grid md:w-[36.5rem]">
            <div class="grid bg-slate-800 rounded-lg p-2 mt-3">
                <div class="p-0 m-2 flex justify-between items-center" @click.self="showCreators = !showCreators">
                    <p class="p-0 m-0 text-left text-lg">Creators</p>
                    <i v-if="showCreators" class="fa fa-filter text-xl cursor-pointer" @click="showCreators = false"></i>
                    <i v-else class="fa fa-angle-down text-xl cursor-pointer" @click="showCreators = true"></i>
                </div>
                
                <div v-if="showCreators" class="grid grid-cols-5 justify-center pr-2 max-h-[25rem] scrollbar">
                    <CreatorModal v-for="creator in creators" :key="creator.id" :creator="creator" show-delete @remove-creator="n => handleDelete(n)" />
                </div>
            </div>

            <div class="grid bg-slate-800 rounded-lg p-2 my-3">
                <div class="p-0 m-2 flex justify-between items-center" @click.self="showUsers = !showUsers">
                    <p class="p-0 m-0 text-left text-lg">Alm. brugere</p>
                    <i v-if="showUsers" class="fa fa-filter text-xl cursor-pointer" @click="showUsers = false"></i>
                    <i v-else class="fa fa-angle-down text-xl cursor-pointer" @click="showUsers = true"></i>
                </div>
                
                <div v-if="showUsers" class="grid justify-center pr-2 max-h-[25rem] scrollbar">
                    <!-- <CreatorModal v-for="creator in creators" :key="creator.id" :creator="creator" /> -->
                    <p class="w-full p-2 px-4 bg-slate-900 rounded-lg">Der er desværre ikke noget at vise her</p>
                </div>
            </div>

            <div class="grid bg-slate-800 rounded-lg p-2 mb-3">
                <div class="p-0 m-2 flex justify-between items-center" @click.self="showAdmins = !showAdmins">
                    <p class="p-0 m-0 text-left text-lg">Admins</p>
                    <i v-if="showAdmins" class="fa fa-filter text-xl cursor-pointer" @click="showAdmins = false"></i>
                    <i v-else class="fa fa-angle-down text-xl cursor-pointer" @click="showAdmins = true"></i>
                </div>
                
                <div v-if="showAdmins" class="grid justify-center pr-2 max-h-[25rem] scrollbar">
                    <!-- <CreatorModal v-for="creator in creators" :key="creator.id" :creator="creator" /> -->
                     <p class="w-full p-2 px-4 bg-slate-900 rounded-lg">Der er desværre ikke noget at vise her</p>
                </div>
            </div>
        </div>

        <div v-else class="bg-slate-800 rounded-lg p-4 md:w-[36.5rem] mt-3">
            <h1 class="text-xl">Opret ny bruger</h1>

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
            <button class="bg-green-500 w-full hover:bg-green-600 duration-200 p-2 px-4 rounded-lg font-semibold"
            @click="handleRegister">Opret</button>
        </div>
    </div>
</template>

<style scoped>
.scrollbar {
  overflow-y: scroll;
  scrollbar-color: grey rgba(94, 94, 94, 0.15);
  scrollbar-width: thin;
}
</style>