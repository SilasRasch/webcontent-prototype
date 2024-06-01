<script setup>
import { ref } from 'vue';

const showModal = ref(false) 
</script>

<template>
    <div>
        <div @click="showModal = !showModal" class="cursor-pointer">
            <slot name="trigger"></slot>
        </div>

        <Transition>
            <div v-show="showModal" @click.self="showModal = !showModal" class="z-50 absolute w-[100vw] h-[100vh] top-0 left-0">
                <div
                class="p-2 px-4 rounded-lg text-white bg-gray-800 
                min-w-fit w-[21rem] text-center min-h-fit md:mb-96 absolute md:top-[78px] top-[112px] right-0 shadow-2xl shadow-black pb-4">
                    <div class="grid w-full mt-2 gap-4">
                        <slot></slot>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
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