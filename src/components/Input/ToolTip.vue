<script setup>
const props = defineProps(['label'])
</script>

<template>
    <span class="tooltip mx-1 rounded-full font-semibold text-sm px-2 duration-200 cursor-help">
        {{ props.label }}
        <span class="tooltiptext"><slot></slot></span>
    </span>
</template>