<script setup>
import { RouterLink } from 'vue-router';
const props = defineProps({
    brand: {
        type: String,
        required: true
    },
    orderId: {
        type: Number,
        required: true
    },
    colorClass: {
        type: String,
        required: false,
        default: 'bg-red-500'
    },
    awaitingUser: {
        type: Boolean,
        default: false,
    },
    admin: {
        type: Boolean,
        required: false
    }
})

let routeTo;
if (!props.admin) {
    routeTo = `min-side/projekt/${props.orderId}`
} else {
    routeTo = `admin/confirm/${props.orderId}`
}
</script>

<template>
    <RouterLink :to="routeTo" draggable="false">
        <div class="flex flex-col bg-slate-800 p-2 py-4 rounded-lg text-left aspect-square opacity-80 hover:opacity-100 duration-200 hover:cursor-pointer select-none">
            <h3 class="font-semibold text-xl px-2 p-1 rounded text-white" :class="props.colorClass">{{ props.brand }}</h3>
            <p class="px-1 text-white font-semibold"><slot></slot></p>
            <span v-if="props.awaitingUser" class="text-white p-1 px-2 rounded-lg mt-auto w-fit" :class="props.colorClass">Afventer dig</span>
        </div>
    </RouterLink>
</template>