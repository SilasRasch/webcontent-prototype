<script setup>
import { ref } from 'vue';

const model = defineModel()
const props = defineProps({
    item: String,
})

function handleAdd(item) {
    model.value.push(item)
}

let showCheck = ref(false)
</script>

<template>
    <li class="item bg-red-300 rounded-lg p-2 input-field hover:opacity-100 cursor-pointer my-1"
        v-if="!model.includes(props.item)"
        @click="handleAdd(props.item)"
        >
            <span class="checkbox border-2 border-gray-400 rounded-lg p-0.5 px-1 opacity-50 hover:opacity-100 bg-white duration-200" 
            @mouseover="showCheck = !showCheck" @mouseleave="showCheck = false">
                <i class="fa fa-check" :class="{'opacity-0': !showCheck}" @mouseover="showCheck = !showCheck" @mouseleave="showCheck = false"></i>
            </span>
            <span class="item-text mx-1 text-white font-semibold">{{ props.item }}</span>
        </li>
</template>


