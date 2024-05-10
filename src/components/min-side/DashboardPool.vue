<script setup>
import OrderCardMini from './OrderCardMini.vue';

const model = defineModel()
</script>

<template>
    <!-- Dashboard -->
    <div class="grid gap-2 w-[90vw] p-2 rounded-xl mt-0">
        <!-- Column 1 -->
        <div class="grid gap-2">
            <h3 class="text-xl font-semibold p-1 m-0 bg-red-500 text-white rounded-xl"><slot></slot></h3>
            <hr class="text-white bg-white rounded-full opacity-50 h-1 mx-0.5 border-none" />

            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                <OrderCardMini v-for="index in model" :key="index" brand="Brand">Projektnavn</OrderCardMini>
            </div>
        </div>
    </div>
</template>