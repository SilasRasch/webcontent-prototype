<script setup>
import { ref } from 'vue';

const props = defineProps({
    brand: {
        type: Object,
        required: true,
    }
})
const showModal = ref(false)

const handleToggle = () => {
    showModal.value = !showModal.value
}

</script>

<template>
    <div class="relative grid items-center justify-center gap-2 bg-slate-900 bg-opacity-80 hover:bg-opacity-100 rounded-lg h-24 duration-200 cursor-pointer"
    @click="handleToggle">
        {{ props.brand.name }}
        <i class="fa fa-star text-xl absolute right-2 top-1 cursor-pointer hover:text-yellow-400 duration-200 hover:scale-110"></i>
    </div>

    <Transition>
            <div v-show="showModal" @click.self="handleToggle" class="z-50 fixed bg-black bg-opacity-50 w-full h-full top-0 left-0">
                <div class="p-2 rounded-lg text-white min-w-[20rem] bg-gray-800 shadow-2xl shadow-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute">
                    <p class="p-0 m-0 text-center font-semibold">{{ props.brand.name }}</p>
                    <hr class="mx-2 opacity-50">
                    <div class="grid gap-2 p-2 text-base">
                        <div class="grid text-left bg-slate-950 rounded-lg p-2">
                            <p class="m-0 p-0 font-semibold">Navn</p>
                            <p class="m-0 p-0">{{ props.brand.name }}</p>
                        </div>
                        <div class="grid text-left bg-slate-950 rounded-lg p-2">
                            <p class="m-0 p-0 font-semibold">URL</p>
                            <p class="m-0 p-0">{{ props.brand.url }}</p>
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