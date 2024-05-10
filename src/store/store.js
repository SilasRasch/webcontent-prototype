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
        channelsArr: [],
        formatArr: [],
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
            channelsArr: [],
            formatArr: [],
        }
    },

    confirmOrder(id) {
        const index = this.orders.findIndex((order) => order.orderId === id)
        this.orders[index].isConfirmed = true
    },

    role: 'Bruger',

    mockOrder: {
        orderId: 999,
        brand: 'WebContent',
        cvr: '40791752',
        contact: {
            name: 'Mathias Hansen',
            phone: '12344321',
            email: 'info@webcontent.dk',
        },
        projectName: 'Content Cloud',
        projectType: 'User Generated Content',
        contentCount: 5,
        contentLength: 60,
        channels: 'TikTok, Instagram',
        format: '9:16, 4:5',
        extraCreator: true,
        extraHook: true,
        extraHookCount: 2,
        extraNotes: 'Vægt på reviews og testimonials',
        notes: 'Reklamefilm til WebContents nye digitale alt-i-en platform',
        isConfirmed: true,
        source: 'LinkedIn',
        price: 6219,
        deliveryTimeFrom: 1,
        deliveryTimeTo: 3
    },
})