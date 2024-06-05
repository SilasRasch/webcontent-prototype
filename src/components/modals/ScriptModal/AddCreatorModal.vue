<script setup>
import { useOrderAPI } from '@/store/api/orderApi';
import { auth } from '@/store/auth';
import { ref } from 'vue';

const model = defineModel()
const showModal = ref(false)
const emit = defineEmits(["refetch"])
const api = useOrderAPI()

const creatorId = ref(null)
const error = ref('')

const handleToggle = () => {
    if (auth.isAdmin()) {
        showModal.value = !showModal.value
        error.value = ''
        creatorId.value = null
    }
}

const handleConfirm = () => {
    if (creatorId.value > 0) {
        handleAddCreator(creatorId.value)
    } else {
        error.value = "Indtast et gyldigt id"
    } 
}

const handleAddCreator = (id) => {
    if (model.value.creators === null) {
        model.value.creators = []
    }

    if (!model.value.creators.includes(id)) {
        model.value.creators.push(id)
        api.putOrder(model.value.id, model.value).then(() => emit("refetch"))
        handleToggle()
    }
    else {
        error.value = "Denne creator er allerede tilknyttet dette projekt"
    }
}
</script>

<template>
    <button v-if="auth.isAdmin()" @click="handleToggle" class="w-24 h-32 rounded-lg bg-slate-950 font-semibold text-3xl flex justify-center items-center m-2">+</button>
    
    <Transition>
            <div v-show="showModal" @click.self="handleToggle" class="z-50 absolute bg-black bg-opacity-50 w-full h-full top-0 left-0">
                <div class="p-2 px-4 rounded-lg text-white min-w-[20rem] bg-gray-800 shadow-2xl shadow-black pb-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute">
                    <div class="grid w-full mt-2 gap-2">
                        <p class="font-semibold">Tilføj creator</p>

                        <p v-if="error !== ''" class="text-red-600 p-0 m-0 text-left">* {{ error }}</p>
                        <p class="text-left p-0 m-0">Creator</p>

                        <input type="number" placeholder="Creator id" class="input rounded-lg" v-model="creatorId" />
                        <hr class="mt-2">
                        
                        <div class="w-full flex justify-center">
                            <button class="rounded-lg p-2 bg-green-600 hover:bg-green-500 duration-200 mx-0.5 mt-2 w-full" @click="handleConfirm()">
                                Bekræft <i class="fa fa-check"></i>
                            </button>
                            <button class="rounded-lg p-2 bg-red-600 hover:bg-red-500 duration-200 mx-0.5 mt-2 w-full" @click="showModal = false">
                                Annullér <i class="fa fa-times"></i>
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
</style>