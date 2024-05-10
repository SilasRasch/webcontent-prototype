<script setup>
const props = defineProps({
    brand: {
        type: String,
        required: true
    }
})
</script>

<template>
    <div class="bg-red-600 p-2 py-4 rounded-lg text-left aspect-square opacity-80 hover:opacity-100 hover:cursor-pointer select-none">
        <h3 class="font-semibold text-xl px-2 p-1 bg-red-800 rounded text-white">{{ props.brand }}</h3>
        <p class="px-1 text-white font-semibold"><slot></slot></p>
    </div>
</template>