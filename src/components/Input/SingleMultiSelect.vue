<script setup>
import { ref } from 'vue';

const props = defineProps({
    label: String,
    placeholder: String,
    required: Boolean,
})

const model = defineModel()

var open = ref(false)

function handleToggle() {
    open.value = !open.value
}

function handleRemove(item) {
    const index = model.value.indexOf(item)
    model.value.splice(index, 1)
    handleToggle()

    console.log(model.value.length);
}
</script>

<template>
    <div class="container box-border mb-2">
        <p class="px-0 text-left">{{ props.label }} <strong v-if="props.required" :class="{'text-red-500': model.length < 1}">*</strong></p>
        <div class="flex justify-between select-btn text-left input-field p-2 cursor-pointer select-none items-center min-h-10"
        @click="handleToggle"
        >
            <span v-if="model.length < 1" class="btn-text text-left opacity-40">{{ props.placeholder }}</span>
            <div v-else class="flex z-50">
                <button v-for="item in model" :key="item"
                class="opacity-100 hover:opacity-50 bg-red-500 rounded-lg px-2 font-semibold text-white flex items-center duration-200 mx-0.5"
                @click="handleRemove(item)"
                >{{ item }} <i class="fa fa-times text-xs pl-1"></i></button>
            </div>
            <span class="arrow-down fa fa-chevron-down px-2 opacity-80"></span>
        </div>
        
        <Transition>
            <ul v-if="open" class="list-items my-1 text-left">
                <slot>
                
                </slot>
            </ul>
        </Transition>
    </div>
</template>

<style scoped>
.v-enter-from {
  opacity: 0;
  transform: translateY(-10px)
}

.v-enter-to {
  opacity: 1;
  transform: translateY(0)
}

.v-enter-active {
  transition: all 0.4s ease-in-out;
}

.v-leave-from {
    z-index: -100;
    opacity: 0;
    transform: translateY(0)
}

.v-leave-to {
    opacity: 0;
    transform: translateY(-5px)
}

.v-leave-active {
    transition: all 0.2s ease-in-out;
}

.v-move {
    opacity: 0;
    transition: all 0.2s ease-in-out;
}
</style>