<script setup>
import OrderCardMini from './OrderCardMini.vue';

const model = defineModel()

const props = defineProps({
    admin: {
        type: Boolean,
        required: false
    }
})
</script>

<template>
    <div class="grid gap-2 w-[90vw] p-2 rounded-xl mt-0">
        <!-- Column 1 -->
        <div class="grid gap-2">
            <h3 class="text-xl font-semibold p-1 m-0 bg-red-500 text-white rounded-xl"><slot></slot></h3>
            <hr class="text-white bg-white rounded-full opacity-50 h-1 mx-0.5 border-none" />

            <div v-if="model.length > 0">
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    <OrderCardMini v-for="index in model" :key="index.id" :order-id="index.id" :brand="index.brand.name" :admin="props.admin">{{ index.projectName }}</OrderCardMini>
                </div>
            </div>
            <div v-else>
                <p class="text-white sm:text-lg font-semibold py-6 bg-slate-800 rounded-lg">Der er ingen bestillinger at se her...</p>
            </div>
        </div>
    </div>
</template>