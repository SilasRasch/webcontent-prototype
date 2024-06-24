<script setup>
const emit = defineEmits("changeTab")
</script>

<template>
    <div class="grid w-full mt-2 gap-4">
        <div class="flex cursor-pointer" @click="emit('changeTab', 0)">
            <span class="fa fa-angle-left fa-2x"></span>
            <p class="p-0 py-1 mx-3">Tilbage</p>
        </div>
        <hr />
        <div class="grid gap-2 md:max-w-[400px]">
            <div class="flex flex-col bg-gray-900 p-2 rounded-lg px-3 text-left">
                <p class="text-base">Kan jeg regne med den estimerede pris?</p>
                <p class="text-sm">Den estimerede pris er ikke endegyldig, og den endelige pris kommer meget an på, om der nogle særlige forhold ved præcis dit projekt.</p>
            </div>
            <div class="flex flex-col bg-gray-900 p-2 rounded-lg px-3 text-left">
                <p class="text-base">Hvor lang tid går der før min bestilling bekræftes?</p>
                <p class="text-sm">Der plejer maximum at tage 2 hverdage for os at bekræfte en ny bestilling.</p>
            </div>
            <div class="flex flex-col bg-gray-900 p-2 rounded-lg px-3 text-left">
                <p class="text-base">Kan jeg annullere min bestilling?</p>
                <p class="text-sm">Ja, og nej. Det kommer an på hvor langt vi er i forløbet. Tag kontakt til os, så ser vi på det.</p>
            </div>
            <div class="flex flex-col bg-red-500 p-2 rounded-lg px-3 cursor-pointer hover:bg-red-600 duration-200">
                <p class="text-base text-center">Vis flere</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>