import { reactive } from "vue";

export const store = reactive({
    orders: [],
    mockId: 1000,
    newOrder: {
        brand: '',
        phone: '',
        email: '',
        source: '',
        projectName: '',
        projectType: '',
        contentCount: '',
        contentLength: '',
        channels: '',
        extraCreator: '',
        extraHook: '',
        extraNotes: '',
        orderId: 0,
        isConfirmed: false,
    },

    addOrder(order) {
        this.newOrder.orderId = this.mockId
        this.orders.push(order)
        this.mockId++
        console.log(this.orders);

        // Reset newOrder
        this.newOrder = {
            brand: '',
            phone: '',
            email: '',
            source: '',
            projectName: '',
            projectType: '',
            contentCount: '',
            contentLength: '',
            channels: '',
            extraCreator: '',
            extraHook: '',
            extraNotes: '',
            orderId: 0,
            isConfirmed: false,
        }
    },
    role: 'Bruger'
})