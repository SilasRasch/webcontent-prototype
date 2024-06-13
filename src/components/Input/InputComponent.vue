<script setup>
const model = defineModel()

const props = defineProps({
    placeholder: {
        type: String,
        required: false,
    },
    required: {
        type: Boolean,
        default: false,
    },
    type: String,
    default: new String("text")
})
</script>

<template>
    <div class="input text-left w-full">
        <p class="px-0"><slot></slot> <strong v-if="props.required" :class="{'text-red-500': model === ''}">*</strong></p>
        <input class="w-full input-field" v-model="model" :placeholder="props.placeholder">
    </div>
</template>