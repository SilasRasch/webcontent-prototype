<script setup>
</script>

<template>
    <div class="flex sm:flex-row flex-col gap-2 w-full">
        <slot></slot>
    </div>
</template>

<style scoped>
input:focus {
    outline: none;
    border-color: inherit;
    -webkit-box-shadow: none;
    @apply border-2 border-gray-300
}
</style>