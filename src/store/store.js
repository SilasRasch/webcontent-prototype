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
        contentCount: 5,
        contentLength: 60,
        channels: '',
        extraCreator: false,
        extraHook: false,
        extraNotes: '',
        orderId: 0,
        isConfirmed: false,
        price: 0,
        deliveryTime: {
            from: 0,
            to: 0,
        },
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
            price: 0,
            deliveryTime: {
                from: 0,
                to: 0,
            },
        }
    },

    confirmOrder(id) {
        const index = this.orders.findIndex((order) => order.orderId === id)
        this.orders[index].isConfirmed = true
    },

    role: 'Bruger',
})