<script setup>
const props = defineProps({
    placeholder: {
        type: String,
        required: false,
    },
    required: {
        type: Boolean,
        default: false,
    }
})
const model = defineModel()
</script>

<template>
    <div class="input text-left my-2">
        <div class="input text-left mt-0">
            <p class="px-0"><slot></slot> <strong v-if="props.required" :class="{'text-red-500': model === ''}">*</strong></p>
            <input class="w-full input-field" v-model="model" :placeholder="props.placeholder">
        </div>
    </div>
</template>