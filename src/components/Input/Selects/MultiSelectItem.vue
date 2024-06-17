<script setup>
import { ref } from 'vue';

const model = defineModel()
const props = defineProps({
    item: String,
    custom: Boolean
})

const customInput = ref('')

const handleAdd = (item) => {
    if (item !== '') {
        model.value.push(item)
    }
}

const handleAddCustom = () => {
    if (customInput.value !== '') {
        model.value.push(customInput.value)
        customInput.value = ''
    }
}

let showCheck = ref(false)
</script>

<template>
    <li class="item bg-red-300 rounded-lg p-2 input-field hover:opacity-100 cursor-pointer my-1"
    v-if="!model.includes(props.item) && !props.custom"
    @click="handleAdd(props.item)"
    >
        <span class="checkbox border-2 border-gray-400 rounded-lg p-0.5 px-1 opacity-50 hover:opacity-100 bg-white duration-200" 
        @mouseover="showCheck = !showCheck" @mouseleave="showCheck = false">
            <i class="fa fa-check" :class="{'opacity-0': !showCheck}" @mouseover="showCheck = !showCheck" @mouseleave="showCheck = false"></i>
        </span>
        <span class="item-text mx-1 text-white font-semibold">{{ props.item }}</span>
    </li>

    <li class="item bg-red-300 rounded-lg p-2 input-field hover:opacity-100 cursor-pointer my-1 flex"
    v-else-if="!model.includes(props.item) && props.custom"
    @click.self="handleAddCustom(customInput)" @keyup.enter="handleAddCustom(customInput)"
    >
        <span class="checkbox border-2 border-gray-400 rounded-lg p-0.5 px-1 opacity-50 hover:opacity-100 bg-white duration-200" 
        @mouseover="showCheck = !showCheck" @mouseleave="showCheck = false">
            <i class="fa fa-check" :class="{'opacity-0': !showCheck}" @mouseover="showCheck = !showCheck" @mouseleave="showCheck = false"></i>
        </span>
        <div class="flex items-center mx-1 w-full">
            <input v-model="customInput" class="item-text text-white font-semibold bg-red-300 w-full" placeholder="Andet"/>
            <i v-show="customInput !== ''" class="fa fa-check text-white px-1" @click.self="handleAddCustom(customInput)"></i>
        </div>
    </li>
</template>


