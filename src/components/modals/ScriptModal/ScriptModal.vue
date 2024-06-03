<script setup>
import { auth } from '@/store/auth';
import { store } from '@/store/store';
import { ref } from 'vue';

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    index: {
        type: Number,
        required: true
    }
})

const model = defineModel()
const showModal = ref(false)

const link = ref(props.link)
const name = ref(props.name)
const linkError = ref('')
const nameError = ref('')

const handleToggle = () => {
    if (auth.isAdmin()) {
    showModal.value = !showModal.value
    linkError.value = ''
    nameError.value = ''
    }
}

const handleConfirm = () => {
    if (link.value.startsWith('https://docs.google.com/') && (name.value.length > 2 && name.value.length <= 16)) {
        showModal.value = false

        // First change state
        model.value.scripts[props.index] = { name: name.value, link: link.value }

        // Then change database
        store.updateScript(model.value.id, props.index, name.value, link.value)
    }
    
    if (!link.value.startsWith('https://docs.google.com/')) {
        linkError.value = "Usikkert link (bør ligne: docs.google.com/...)"
    } else {
        linkError.value = ''
    }

    if (name.value.length < 2) {
        nameError.value = "Navnet skal være minimum 2 karaktere"
    } else if (name.value.length > 16) {
        nameError.value = 'Navnet skal være maximum 16 karaktere'
    } else {
        nameError.value = ''
    }
}
</script>

<template>
    <a v-if="auth.isAdmin()" class="p-4 rounded-lg cursor-pointer text-nowrap" :class="link === '' ? 'bg-blue-500' : 'bg-green-500'" @click="handleToggle">{{ props.name }}</a>
    <a v-else class="p-4 rounded-lg cursor-pointer text-nowrap" :class="link === '' ? 'bg-blue-500' : 'bg-green-500'" :href="link">{{ props.name }}</a>

    <Transition>
            <div v-show="showModal" @click.self="handleToggle" class="z-50 absolute bg-black bg-opacity-50 w-[100vw] h-[100vh] top-0 left-0">
                <div class="p-2 px-4 rounded-lg text-white min-w-[20rem] bg-gray-800 shadow-2xl shadow-black pb-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute">
                    <div class="grid w-full mt-2 gap-2">
                        <p>Redigér script</p>

                        <p v-if="nameError !== ''" class="text-red-600 p-0 m-0 mt-2">* {{ nameError }}</p>
                        <p class="text-left p-0 m-0">Navn</p>
                        <input placeholder="Navn på scriptet" class="input rounded-lg" v-model="name" type="text" />

                        <p v-if="linkError !== ''" class="text-red-600 p-0 m-0 mt-2">* {{ linkError }}</p>
                        <p class="text-left p-0 m-0">Link til dokument</p>
                        <!-- If model.status.category > 1 -->
                        <input v-if="model.status.category === 1" placeholder="https://docs.google.com/..." class="input rounded-lg" v-model="link" />
                        <div v-else class="flex items-center">
                            <input placeholder="https://docs.google.com/..." class="input rounded-l-lg" v-model="link" />
                            <a :href="link" class="fa fa-external-link bg-red-500 p-2 px-2.5 rounded-r-lg hover:bg-red-400 duration-200 text-base cursor-pointer"></a>
                        </div>

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