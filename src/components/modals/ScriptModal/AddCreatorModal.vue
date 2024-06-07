<script setup>
import { useCreatorAPI } from '@/store/api/creatorApi';
import { useOrderAPI } from '@/store/api/orderApi';
import { auth } from '@/store/auth';
import { ref, watch } from 'vue';
import CreatorModal from './CreatorModal.vue';

const model = defineModel()
const showModal = ref(false)
const emit = defineEmits(["refetch"])
const api = useOrderAPI()
const creatorAPI = useCreatorAPI()
const error = ref('')
const creators = ref([])

const searchTerm = ref('')
watch(searchTerm, async (newSearchTerm) => {
    if (newSearchTerm && newSearchTerm.length > 0) {
        creatorAPI.getCreators(newSearchTerm)
            .then((data) => creators.value = data)
    }
    else {
        creatorAPI.getCreators()
            .then((data) => creators.value = data)
    }
})

const handleToggle = () => {
    if (auth.isAdmin()) {
        showModal.value = !showModal.value
        error.value = ''
        searchTerm.value = null
        tmpList.value = []
    }
}

const tmpList = ref([])
const addToTempList = (id) => {
    if (!tmpList.value.includes(id)) {
        tmpList.value.push(id)
    }
    
    console.log(tmpList.value);
}

const removeFromTempList = (id) => {
    if (tmpList.value.includes(id)) {
        tmpList.value = tmpList.value.filter(x => x.id === id)
    }
}

const handleConfirm = () => {
    if (model.value.creators === null) {
        model.value.creators = []
    }

    if (tmpList.value.length > 0) {
        model.value.creators = [...model.value.creators, ...tmpList.value]
        api.putOrder(model.value.id, model.value).then(() => emit("refetch"))
        handleToggle()
    }

    
}


</script>

<template>
    <button v-if="auth.isAdmin()" @click="handleToggle" class="w-24 h-32 rounded-lg bg-slate-950 font-semibold text-3xl flex justify-center items-center m-2">+</button>
    
    <Transition>
            <div v-show="showModal" @click.self="handleToggle" class="z-50 fixed bg-black bg-opacity-50 w-full h-full top-0 left-0">
                <div class="p-2 px-4 rounded-lg text-white w-[24rem] bg-gray-800 shadow-2xl shadow-black pb-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute">
                    <div class="grid w-full mt-2 gap-2">
                        <p class="font-semibold">Tilføj creator</p>

                        <p v-if="error !== ''" class="text-red-600 p-0 m-0 text-left">* {{ error }}</p>
                        <input placeholder="Søg efter creator" class="input rounded-lg" v-model="searchTerm" />
                        <hr class="mt-2">
                        
                        <div class="grid grid-cols-3 justify-center max-h-[300px] overflow-y-scroll scrollbar -ml-2 pr-2 min-h-36">
                            <CreatorModal v-for="creator in creators.filter(x => !model.creators.includes(x.id))" :key="creator.id" :creator="creator" @add-creator="n => addToTempList(n)" @remove-from-temp="n => removeFromTempList(n)" show-add :show-check="tmpList.includes(creator.id)" />
                        </div>
                        
                        
                        <div class="w-full flex justify-center">
                            <button class="rounded-lg p-2 bg-green-600 hover:bg-green-500 duration-200 mx-0.5 mt-2 w-full" @click="handleConfirm()" :disabled="tmpList.length === 0">
                                Tilføj valgte <i class="fa fa-check"></i>
                            </button>
                            <button class="rounded-lg p-2 bg-red-600 hover:bg-red-500 duration-200 mx-0.5 mt-2 w-full" @click="handleToggle">
                                Annuller
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
</template>

<style scoped>
.input {
    @apply bg-gray-900 text-base p-2 font-normal w-full
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

.scrollbar {
  overflow-y: scroll;
  scrollbar-color: grey rgba(94, 94, 94, 0.15);
  scrollbar-width: thin;
}
</style>