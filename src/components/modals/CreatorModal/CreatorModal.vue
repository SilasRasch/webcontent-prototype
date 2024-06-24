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
    <div @click="handleToggle" class="w-24 h-32 rounded-lg bg-slate-950 flex flex-col justify-end items-center m-2 mr-0 cursor-pointer relative">
        <i class="fa fa-user fa-3x opacity-65 absolute top-8"></i>
        <!-- <p v-if="creator.handles.instagram" class="p-0 m-0 opacity-65 mb-2 mx-2 truncate text-sm">{{ creator.name }}</p> -->
        <p v-if="creator.name" class="p-0 m-0 opacity-65 mb-2 mx-2 leading-4 text-sm">{{ creator.name }}</p>
        <i v-if="props.showCheck" class="rounded-full fa fa-check absolute bg-green-500 p-2 -top-2 -right-2"></i>
    </div>

    <Transition>
            <div v-show="showModal" @click.self="handleToggle" class="z-50 fixed bg-black bg-opacity-50 w-full h-full top-0 left-0">
                <div class="p-2 px-4 rounded-lg text-white min-w-[20rem] bg-gray-800 shadow-2xl shadow-black pb-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute">
                    <div class="grid w-full gap-2">
                        <p class="font-semibold">{{ creator.name }}</p>

                        <div class="flex items-center justify-center gap-2">
                            <div @click="handleToggle" class="w-24 h-32 rounded-lg bg-slate-950 flex flex-col justify-center m-2 mr-0">
                                <i class="fa fa-user fa-3x opacity-65 flex justify-center items-center"></i>
                            </div>
                            <hr class="h-[75%] border-l-[0.5px] opacity-50 mx-1 border-white">
                            <div>
                                <div class="flex gap-2 items-center">
                                    <i class="fa fa-envelope text-2xl"></i>
                                    <p class="text-left p-0 m-0">{{ creator.email }}</p>
                                </div>

                                <div v-if="creator.handles.instagram"  class="flex gap-2 items-center">
                                    <i class="fa fa-instagram text-2xl"></i>
                                    <p class="text-left p-0 m-0">{{ creator.handles.instagram }}</p>
                                </div>

                                <div v-if="creator.handles.tikTok"  class="flex gap-2 items-center">
                                    <i class="fa fa-music text-2xl"></i>
                                    <p class="text-left p-0 m-0">{{ creator.handles.tikTok }}</p>
                                </div>

                                <div v-if="creator.handles.facebook"  class="flex gap-2 items-center">
                                    <i class="fa fa-facebook text-2xl"></i>
                                    <p class="text-left p-0 m-0">{{ creator.handles.facebook }}</p>
                                </div>

                                <div v-if="creator.handles.youTube"  class="flex gap-2 items-center">
                                    <i class="fa fa-youtube text-2xl"></i>
                                    <p class="text-left p-0 m-0">{{ creator.handles.youTube }}</p>
                                </div>

                                <div v-if="creator.handles.snapchat"  class="flex gap-2 items-center">
                                    <i class="fa fa-snapchat text-2xl"></i>
                                    <p class="text-left p-0 m-0">{{ creator.handles.snapchat }}</p>
                                </div>

                                <div v-if="creator.handles.pinterest"  class="flex gap-2 items-center">
                                    <i class="fa fa-pinterest text-2xl"></i>
                                    <p class="text-left p-0 m-0">{{ creator.handles.pinterest }}</p>
                                </div>
                                
                            </div>
                        </div>
                        

                        <hr class="mt-2">
                        
                        <div class="w-full flex justify-center">
                            <button v-if="auth.isAdmin() && props.showDelete && !areYouSure" class="rounded-lg p-2 bg-red-600 bg-opacity-65 hover:bg-red-500 duration-200 mx-0.5 mt-2 w-full"
                            @click="areYouSure = true">
                                <i class="fa fa-trash"></i>
                            </button>
                            <div v-else-if="auth.isAdmin() && props.showDelete && areYouSure" class="flex justify-center items-center w-full">
                                <div class="flex w-full">
                                    <button class="rounded-lg p-2 bg-red-600 bg-opacity-65 hover:bg-red-500 duration-200 mx-0.5 mt-2 w-full"
                                    @click="handleRemove(props.creator.id)">
                                        Er du sikker?
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