<script setup>
import { store } from '@/store/store';
import MyDashboard from '@/components/min-side/MyDashboard.vue';

function isAdmin(role) {
    if (role === "Admin") {
        return true
    }

    return false
}

var titles
if (store.role === "Admin") {
    titles = {
        title: "Kontrolpanel",
        subTitle: "Bestillinger"
    }
}
else {
    titles = {
        title: "Min side",
        subTitle: "Mine bestillinger"
    }
}
</script>

<template>
    <div class="grid justify-center text-center m-4">
        <h1 class="text-3xl font-semibold">{{ titles.title }}</h1>

        <hr class="text-black bg-black opacity-50 h-0.5 m-3 mb-1" />

        <div>
            <h1 class="text-xl font-semibold m-2">
                {{ titles.subTitle }}
            </h1>

            <MyDashboard :admin="isAdmin(store.role)" />
        </div>
    </div>    
</template>