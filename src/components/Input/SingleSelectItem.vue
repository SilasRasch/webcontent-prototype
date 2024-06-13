<script setup>
import { ref } from 'vue';

const emit = defineEmits(["onChoose"])
const model = defineModel()
const props = defineProps({
    item: String,
    custom: Boolean,
    fullLength: Boolean,
})

const customInput = ref('')

const handleAdd = (item) =>  {
    if (item !== '') {
        model.value = item
        emit("onChoose", item)
    }
}
</script>

<template>
    <li v-if="!props.custom" class="item bg-red-300 rounded-lg p-2 input-field hover:opacity-100 cursor-pointer my-1" :class="props.fullLength ? 'md:min-w-[34.5rem]' : 'md:min-w-[17rem]'"
    @click="handleAdd(props.item)">
        <span class="item-text mx-1 text-white font-semibold w-full">{{ props.item }}</span>
    </li>

    <li v-else class="item bg-red-300 rounded-lg p-2 input-field hover:opacity-100 cursor-pointer my-1" :class="props.fullLength ? 'md:min-w-[34.5rem]' : 'md:min-w-[17rem]'"
    @click.self="handleAdd(customInput)" @keyup.enter="handleAdd(customInput)">
        <div class="flex items-center w-full">
            <input v-model="customInput" class="item-text text-white font-semibold bg-red-300 w-full" placeholder="Andet"/>
            <i v-show="customInput !== ''" class="fa fa-check text-white px-1" @click.self="handleAdd(customInput)"></i>
        </div>
    </li>
</template>