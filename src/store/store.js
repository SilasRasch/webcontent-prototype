import { reactive } from "vue";

export const store = reactive({
    orders: [],
    mockId: 1000,
    newOrder: {
        orderId: 0,
        brand: '',
        cvr: '',
        contact: {
            name: '',
            phone: '',
            email: '',
        },
        projectName: '',
        projectType: '',
        contentCount: 5,
        contentLength: 60,
        channels: '',
        format: '',
        extraCreator: false,
        extraHook: false,
        extraHookCount: 1,
        extraNotes: '',
        notes: '',
        isConfirmed: false,
        source: '',
        price: 0,
        deliveryTimeFrom: 0,
        deliveryTimeTo: 0,
        sourceArr: [],
    },

    addOrder(order) {
        this.newOrder.orderId = this.mockId
        this.orders.push(order)
        this.mockId++
        console.log(this.orders);

        // Reset newOrder
        this.newOrder = {
            orderId: 0,
            brand: '',
            cvr: '',
            contact: {
                name: '',
                phone: '',
                email: '',
            },
            projectName: '',
            projectType: '',
            contentCount: 5,
            contentLength: 60,
            channels: '',
            format: '',
            extraCreator: false,
            extraHook: false,
            extraHookCount: 1,
            extraNotes: '',
            notes: '',
            isConfirmed: false,
            source: '',
            price: 0,
            deliveryTimeFrom: 0,
            deliveryTimeTo: 0,
            sourceArr: [],
        }
    },

    confirmOrder(id) {
        const index = this.orders.findIndex((order) => order.orderId === id)
        this.orders[index].isConfirmed = true
    },

    role: 'Bruger',
})