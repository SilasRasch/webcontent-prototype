<script setup>
import { ref } from 'vue';

const props = defineProps({
    name: {
        type: String,
        required: true
    }
})

const showModal = ref(false)

const link = ref('')
const name = ref(props.name)
const linkError = ref('')
const nameError = ref('')

const handleToggle = () => {
    showModal.value = !showModal.value
    linkError.value = ''
    nameError.value = ''
}

const handleConfirm = () => {
    if (link.value.startsWith('https://docs.google.com/') && name.value.length > 2) {
        showModal.value = false
    }
    
    if (!link.value.startsWith('https://docs.google.com/')) {
        linkError.value = "Usikkert link (bør ligne: docs.google.com/...)"
    } else {
        linkError.value = ''
    }

    if (name.value.length < 2) {
        nameError.value = "Navnet skal være minimum 2 karaktere"
    } else {
        nameError.value = ''
    }
}
</script>

<template>
    <a class="p-4 bg-blue-500 rounded-lg cursor-pointer" @click="handleToggle">{{ props.name }}</a>

    <Transition>
            <div v-show="showModal" @click.self="handleToggle" class="z-50 absolute bg-black bg-opacity-50 w-[100vw] h-[100vh] top-0 left-0">
                <div class="p-2 px-4 rounded-lg text-white min-w-[20rem] bg-gray-800 shadow-2xl shadow-black pb-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute">
                    <div class="grid w-full mt-2 gap-2">
                        <p>Redigér script</p>

                        <p v-if="nameError !== ''" class="text-red-600 p-0 m-0 mt-2">* {{ nameError }}</p>
                        <p class="text-left p-0 m-0">Navn</p>
                        <input placeholder="Navn på scriptet" class="input" v-model="name" type="text" />

                        <p v-if="linkError !== ''" class="text-red-600 p-0 m-0 mt-2">* {{ linkError }}</p>
                        <p class="text-left p-0 m-0">Link til dokument</p>
                        <input placeholder="Link til dokumentet" class="input" v-model="link" />

                        <hr class="mt-2">

                        <button class="rounded-lg p-2 bg-green-600 hover:bg-green-500 duration-200 mx-0.5 mt-2" @click="handleConfirm()">
                            Bekræft
                        </button>
                        
                    </div>
                </div>
            </div>
        </Transition>
</template>

<style scoped>
.input {
    @apply bg-gray-900 text-base p-2 font-normal w-full rounded-lg
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