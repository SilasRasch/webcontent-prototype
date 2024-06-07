<script setup>
import { auth } from '@/store/auth';
import { ref } from 'vue';

const props = defineProps({
    creator: {
        type: Object,
        required: true
    },
    showDelete: {
        type: Boolean
    },
    showAdd: {
        type: Boolean
    },
    showCheck: {
        type: Boolean
    }
})

const emit = defineEmits(["removeCreator", "addCreator", "removeFromTemp"])

const showModal = ref(false)
const areYouSure = ref(false)

const handleToggle = () => {
    showModal.value = !showModal.value
}

const handleAdd = (id) => {
    showModal.value = false
    emit("addCreator", id)
}
const handleRemove = (id) => {
    showModal.value = false
    emit("removeCreator", id)
}
const handleRemoveFromTemp = (id) => {
    showModal.value = false
    emit("removeFromTemp", id)
}
</script>

<template>
    <div @click="handleToggle" class="w-24 h-32 rounded-lg bg-slate-950 flex flex-col justify-center m-2 mr-0 cursor-pointer relative">
        <i class="fa fa-user text-5xl opacity-65 h-2/3 flex justify-center items-center"></i>
        <p class="p-0 m-0 opacity-65">{{ creator.handle }}</p>
        <i v-if="props.showCheck" class="rounded-full fa fa-check absolute bg-green-500 p-2 -top-2 -right-2"></i>
    </div>

    <Transition>
            <div v-show="showModal" @click.self="handleToggle" class="z-50 fixed bg-black bg-opacity-50 w-full h-full top-0 left-0">
                <div class="p-2 px-4 rounded-lg text-white min-w-[20rem] bg-gray-800 shadow-2xl shadow-black pb-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute">
                    <div class="grid w-full gap-2">
                        <p class="font-semibold">Creator</p>

                        <div class="flex items-center justify-center gap-2">
                            <div @click="handleToggle" class="w-24 h-32 rounded-lg bg-slate-950 flex flex-col justify-center m-2 mr-0">
                                <i class="fa fa-user text-5xl opacity-65 flex justify-center items-center"></i>
                            </div>
                            <hr class="h-[50%] border-l-[0.5px] opacity-50 mx-1 border-white">
                            <div>
                                <p class="text-left p-0 m-0">{{ props.creator.name }}</p>
                                <p class="text-left p-0 m-0">{{ props.creator.handle }}</p>
                                <p class="text-left p-0 m-0">{{ props.creator.email }}</p>
                            </div>
                        </div>
                        

                        <hr class="mt-2">
                        
                        <div class="w-full flex justify-center">
                            <button v-if="auth.isAdmin() && props.showDelete && !areYouSure" class="rounded-lg p-2 bg-red-600 bg-opacity-65 hover:bg-red-500 duration-200 mx-0.5 mt-2 w-full"
                            @click="areYouSure = true">
                                <i class="fa fa-trash"></i>
                            </button>
                            <div v-else-if="auth.isAdmin() && props.showDelete && areYouSure" class="flex justify-center items-center w-full">
                                <p class="underline font-semibold">Sikker?</p>
                                <div class="flex w-full">
                                    <button class="rounded-lg p-2 bg-red-600 bg-opacity-65 hover:bg-red-500 duration-200 mx-0.5 mt-2 w-full"
                                    @click="handleRemove(props.creator.id)">
                                        Ja, slet
                                    </button>
                                    <button class="rounded-lg p-2 bg-slate-600 hover:bg-slate-500 duration-200 mx-0.5 mt-2 w-full font-semibold"
                                    @click="areYouSure = false">
                                        Nej
                                    </button>
                                </div>
                            </div>
                            <button v-if="auth.isAdmin() && props.showAdd && !props.showCheck" class="rounded-lg p-2 bg-green-600 bg-opacity-65 hover:bg-green-500 duration-200 mx-0.5 mt-2 w-full"
                            @click="handleAdd(props.creator.id)">
                                <i class="fa fa-plus"></i>
                            </button>
                            <button v-if="auth.isAdmin() && props.showAdd && props.showCheck" class="rounded-lg p-2 bg-red-600 bg-opacity-65 hover:bg-red-500 duration-200 mx-0.5 mt-2 w-full"
                            @click="handleRemoveFromTemp(props.creator.id)">
                                <i class="fa fa-trash"></i>
                            </button>
                            <button v-if="!areYouSure" class="rounded-lg p-2 bg-slate-600 hover:bg-slate-500 duration-200 mx-0.5 mt-2 w-full font-semibold"
                            @click="handleToggle">
                                Luk
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