<script setup>
const props = defineProps(['order'])
</script>

<template>
    <div class="bg-slate-700 rounded-xl p-6 text-white md:min-w-[40vw] m-2">
        <h3 class="text-left m-2 bg-opacity-50 bg-slate-950 rounded-md p-4 font-semibold text-xl">
            Bestilling {{ props.order.orderId }}
        </h3>
        <div class="grid md:grid-cols-2 [&>*]:mx-2 [&>*]:m-1 md:[&>*]:m-2">
            <div class="order-row">
                <p class="m-1 pb-0">Brand</p>
                <p class="order-row m-2 italic">{{ props.order.brand }}</p>
            </div>
            <div class="order-row">
                <p class="m-1 pb-0">Projektnavn</p>
                <p class="order-row m-2 italic">{{ props.order.projectName }}</p>
            </div>
            <div class="order-row">
                <p class="m-1 pb-0">Projekttype</p>
                <p class="order-row m-2 italic">{{ props.order.projectType }}</p>
            </div>
            <div class="order-row">
                <p class="m-1 pb-0">Mængde af indhold</p>
                <p class="order-row m-2 italic">{{ props.order.contentCount }}</p>
            </div>
            <div class="order-row">
                <p class="m-1 pb-0">Længde af indhold</p>
                <p class="order-row m-2 italic">{{ props.order.contentLength }}</p>
            </div>
            <div class="order-row">
                <p class="m-1 pb-0">Tiltænkte channels</p>
                <p class="order-row m-2 italic">{{ props.order.channels }}</p>
            </div>

            <p class="order-row m-2">Email: {{ props.order.email }}</p>
            <p class="order-row m-2">Telefon: {{ props.order.phone }}</p>
            <p class="order-row m-2">Ekstra creator: {{ props.order.extraCreator }}</p>
            <p class="order-row m-2">Ekstra hook: {{ props.order.extraHook }}</p>
        </div>
        <div class="order-row text-left m-2 pb-0.5">
            <p class="m-1 pb-0">Noter</p>
            <p class="order-row m-2 italic">{{ props.order.extraNotes }}</p>
        </div>
        <div class="order-row m-2 pb-0.5 mt-4">
            <p class="m-1 pb-0">Bekræftelsesstatus</p>
            <p class="bg-opacity-50 rounded-md m-2 italic"
            :class="{'bg-red-600': !props.order.isConfirmed, 'bg-green-600': props.order.isConfirmed }"
            ></p>
        </div>
    </div>
</template>

<style scoped> 
/* [&>*]:text-left [&>*]:mx-2 [&>*]:m-1 md:[&>*]:m-2 */
.order-row {
    @apply bg-opacity-50 bg-slate-950 rounded-md text-left
}
</style>