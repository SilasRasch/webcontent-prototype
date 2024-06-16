<script setup>
import SingleSelect from '@/components/Input/SingleSelect.vue';
import { useAuthAPI } from '@/store/api/authApi';
import { useCreatorAPI } from '@/store/api/creatorApi';
import { ref } from 'vue';
import UserPool from './UserPool.vue';
import { useBrandAPI } from '@/store/api/brandApi';
import { validateBrand, validateUser } from '@/store/validation';
import InputWrapper from '../Input/InputWrapper.vue';
import InputComponent from '../Input/InputComponent.vue';

const api = useCreatorAPI()
const authAPI = useAuthAPI()
const brandAPI = useBrandAPI()
const creators = ref(null)
const error = ref('')

const fetchCreators = () => { return api.getCreators().then((data) => creators.value = data).then((data) => { return data })}
fetchCreators()

const showCreate = ref(false)
const currTab = ref(1)
const user = ref({ displayName: '', email: '', role: '', password: 'WebContentGenerate' })

// Dependant on role
const userInfo = ref({ cvr: '', phone: '' })
const brand = ref({ name: '', url: '', userId: undefined})
const creatorProfile = ref({ location: '', speciality: '', handles: { instagram: '', tikTok: '', facebook: '', youTube: '', snapchat: '', pinterest: '' } })

const toggleShowCreate = () => {
    showCreate.value = !showCreate.value

    // Reset
    user.value = { displayName: '', email: '', role: '', password: 'WebContentGenerate' }
    creatorProfile.value = { location: '', speciality: '', handles: { instagram: '', tikTok: '', facebook: '', youTube: '', snapchat: '', pinterest: '' } }
    brand.value = { name: '', url: '', userId: undefined }
    userInfo.value = { cvr: '', phone: '' }
    error.value = ''
}

const handleRegister = () => {
    if (!validateUser(user.value)) return;

    switch (user.value.role) {
        case "Admin":
            authAPI.register(user.value).then(() => toggleShowCreate()).catch((err) => error.value = err.response.data)
            break;
        case "Creator":           
            authAPI.register({ ...user.value })
                .then((data) => api.postCreator({ ...creatorProfile.value, name: user.value.displayName, email: user.value.email, id: data}))
                .then(() => fetchCreators().then(() => toggleShowCreate()))
                .catch((err) => error.value = err.response.data)
            break;
        case "Bruger":
            if (validateBrand(brand.value))
                authAPI.register({ ...user.value, ...userInfo.value})
                    .then((data) => brandAPI.postBrand({ ...brand.value, userId: data } ).then(() => toggleShowCreate())).catch((err) => error.value = err.response.data)
            break;    
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

            <InputWrapper>
                <InputComponent v-model="user.displayName" placeholder="Navnet på brugeren" required>Navn</InputComponent>
                <InputComponent v-model="user.email" placeholder="Brugerens email" required>Email</InputComponent>
            </InputWrapper>

            <SingleSelect v-model="user.role" :items="['Bruger', 'Creator', 'Admin']" required full-length>Rolle</SingleSelect>

            <!-- Creatorprofil -->
            <div v-if="user.role === 'Creator'">
                <hr class="text-black bg-black opacity-50 h-0.5 m-3" />
                <h1 class="text-xl">Creatorprofil</h1>

                <InputWrapper>
                    <InputComponent v-model="creatorProfile.location" placeholder="Brugerens lokation" required>Lokation</InputComponent>
                    <InputComponent v-model="creatorProfile.speciality" placeholder="Hvad brugeren tilbyder" required>Speciale</InputComponent>
                </InputWrapper>

                <div>
                    <InputWrapper>
                        <InputComponent v-model="creatorProfile.handles.instagram" placeholder="@Brugernavn">Instagram</InputComponent>
                        <InputComponent v-model="creatorProfile.handles.tikTok" placeholder="Brugernavn">TikTok</InputComponent>
                    </InputWrapper>

                    <InputWrapper>
                        <InputComponent v-model="creatorProfile.handles.facebook" placeholder="Brugernavn">Facebook</InputComponent>
                        <InputComponent v-model="creatorProfile.handles.youTube" placeholder="Brugernavn">YouTube</InputComponent>
                    </InputWrapper>

                    <InputWrapper>
                        <InputComponent v-model="creatorProfile.handles.snapchat" placeholder="Brugernavn">Snapchat</InputComponent>
                        <InputComponent v-model="creatorProfile.handles.pinterest" placeholder="Brugernavn">Pinterest</InputComponent>
                    </InputWrapper>
                </div>
            </div>

            <div v-else-if="user.role === 'Bruger'">
                <InputWrapper>
                    <InputComponent v-model="userInfo.phone" placeholder="Nr. på kontaktperson" required>Kontaktnummer</InputComponent>
                    <InputComponent v-model="userInfo.cvr" placeholder="Virksomhedens CVR" required>CVR</InputComponent>
                </InputWrapper>
                
                <hr class="text-black bg-black opacity-50 h-0.5 m-3" />
                <h1 class="text-xl">Brand</h1>
                <InputWrapper>
                    <InputComponent v-model="brand.name" placeholder="Navnet på brandet" required>Brandnavn</InputComponent>
                    <InputComponent v-model="brand.url" placeholder="brandets URL" required>URL</InputComponent>
                </InputWrapper>
            </div>
            

            <hr class="text-black bg-black opacity-50 h-0.5 m-3" />
            <div class="flex justify-center"><button class="bg-red-400 w-full hover:bg-red-500 duration-200 p-2 mx-1 rounded-lg font-semibold" :class="{'opacity-60':!validateUser(user)}"
                @click="handleRegister" :disabled="!validateUser(user)">Opret</button></div>
            <p v-if="error" class="text-red-600">* {{ error }}</p>
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