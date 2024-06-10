<script setup>
import CreatorModal from '../modals/CreatorModal/CreatorModal.vue';

const model = defineModel()

const handleDelete = (id) => {
    console.log(`Delete ${id}`);
}
</script>

<template>
    <div class="grid gap-2 w-[90vw] p-2 rounded-xl mt-0">
        <!-- Column 1 -->
        <div class="grid gap-2">
            <h3 class="text-xl font-semibold p-1 m-0 bg-red-500 text-white rounded-xl"><slot></slot></h3>
            <hr class="text-white bg-white rounded-full opacity-50 h-1 mx-0.5 border-none" />

            <div v-if="model">
                <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 -m-2">
                    <CreatorModal v-for="creator in model" :key="creator.id" :creator="creator" show-delete @remove-creator="n => handleDelete(n)" />
                </div>
            </div>
            <div v-else>
                <p class="text-white sm:text-lg font-semibold py-6 bg-slate-800 rounded-lg">Der er ingen brugere at se her...</p>
            </div>
        </div>
    </div>
</template>