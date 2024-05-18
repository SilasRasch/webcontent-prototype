<script setup>
import { auth } from '@/store/auth';
import MyDashboard from '@/components/min-side/MyDashboard.vue';

let titles
if (auth.isAdmin()) {
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

            <Suspense>
                 <MyDashboard :admin="auth.isAdmin()" />

                 <template #fallback>
                    Loading data...
                 </template>
            </Suspense>
           
        </div>
    </div>    
</template>