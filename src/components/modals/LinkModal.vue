<script setup>
import { auth } from '@/store/auth';
import { store } from '@/store/store';
import { ref } from 'vue';

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
})

const model = defineModel()
const showModal = ref(false)

const link = ref(model.value)
const linkError = ref('')

const handleToggle = () => {
    if (auth.isAdmin()) {
    showModal.value = !showModal.value
    linkError.value = ''
    }
}

const handleConfirm = () => {
    if (link.value.startsWith('https://drive.google.com/')) {
        showModal.value = false
        linkError.value = ''
        model.value = link.value
        store.updateLink(props.id, props.name, link.value)
    } else {
        linkError.value = "Usikkert link (bør ligne: drive.google.com/...)"
    } 
}
</script>

<template>
    <a v-if="auth.isAdmin()" class="p-4 rounded-lg cursor-pointer text-nowrap w-full bg-opacity-65" :class="model === '' ? 'bg-red-500' : 'bg-green-600'" @click="handleToggle">{{ props.name }}</a>
    <a v-else class="p-4 rounded-lg cursor-pointer text-nowrap w-full bg-opacity-65" :class="model === '' ? 'bg-red-500' : 'bg-green-600'" :href="link" target="_blank">{{ props.name }}</a>

    <Transition>
            <div v-show="showModal" @click.self="handleToggle" class="z-50 absolute bg-black bg-opacity-50 w-[100vw] h-[100vh] top-0 left-0">
                <div class="p-2 px-4 rounded-lg text-white min-w-[20rem] bg-gray-800 shadow-2xl shadow-black pb-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute">
                    <div class="grid w-full mt-2 gap-2">
                        <p>Redigér link til {{ props.name }}</p>

                        <p v-if="linkError !== ''" class="text-red-600 p-0 m-0 mt-2">* {{ linkError }}</p>
                        <p class="text-left p-0 m-0">Link til mappe</p>

                        <input placeholder="https://drive.google.com/..." class="input rounded-lg" v-model="link" />
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