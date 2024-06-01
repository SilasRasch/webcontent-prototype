<script setup>
import { ref } from 'vue';
import SingleSelectItem from './SingleSelectItem.vue';

const props = defineProps({
    items: Array,
    placeholder: {
        type: String,
        default: 'Vælg én'
    },
    required: Boolean,
    other: Boolean
})

const model = defineModel()

let open = ref(false)

const handleToggle = () => open.value = !open.value;

const handleRemove = () => {
    model.value = ''
}

const mouseOver = ref(false)
</script>

<template>
    <div class="box-border mb-2">
        <p class="px-0 text-left"><slot></slot> <strong v-if="props.required" :class="{'text-red-500': model.length < 1}">*</strong></p>
        <div class="flex justify-between select-btn text-left input-field p-2 cursor-pointer select-none items-center min-h-10"
        @click.self="handleToggle" @mouseenter="mouseOver = true" @mouseleave="mouseOver = false"
        >
            <span v-if="model.length < 1" class="btn-text text-left opacity-40" @click.self="handleToggle">
                {{ props.placeholder }}
            </span>

            <div v-else class="flex z-50">
                <button
                class="opacity-100 hover:opacity-50 flex items-center duration-200 mx-0.5"
                @click="handleRemove()"
                >{{ model }} <i v-show="mouseOver" class="fa fa-times text-xs pl-1"></i></button>
            </div>
            <span class="arrow-down fa fa-chevron-down px-2 opacity-80" @click.self="handleToggle"></span>
        </div>
        
        <Transition>
            <ul v-if="open" class="list-items my-1 text-left md:z-50 md:absolute bg-white rounded-xl">
                <SingleSelectItem v-for="item in props.items" :item="item" v-model="model" :key="item" />
                <SingleSelectItem v-show="props.other" v-model="model" item="Andet" custom />
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