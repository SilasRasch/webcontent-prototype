import { reactive } from "vue";

export const store = reactive({
    currOrderPage: 0,
    currDashboardTab: 1,
    isLoggedIn: false,
    loggedInUser: undefined,
    // loggedInUser: {
    //     email: undefined,
    //     role: undefined
    // }
    showLoginModal: false,
    toggleLoginModal() {
        this.showLoginModal = !this.showLoginModal
    },

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
        this.newOrder.orderId = this.mockId++
        this.orders.push(order)

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

    confirmOrder(id, price, deliveryfrom, deliveryTo) {
        const index = this.orders.findIndex((order) => order.orderId === id)
        this.orders[index].isConfirmed = true
        this.orders[index].price = price
        this.orders[index].deliveryTimeFrom = deliveryfrom
        this.orders[index].deliveryTimeTo = deliveryTo
    },

    logOut() {
        store.isLoggedIn = false
        store.loggedInUser = undefined
        store.role = '' // Deprecated
    },

    role: '',

    orders: [
        {
        orderId: 997,
        brand: 'WebContent',
        cvr: '40791752',
        contact: {
            name: 'Mathias Hansen',
            phone: '12344321',
            email: 'info@webcontent.dk',
        },
        projectName: 'UGC kampagne',
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
        {
        orderId: 998,
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
        isConfirmed: false,
        source: 'LinkedIn',
        price: 6219,
        deliveryTimeFrom: 1,
        deliveryTimeTo: 3
        },
        {
        orderId: 999,
        brand: 'WebContent',
        cvr: '40791752',
        contact: {
            name: 'Mathias Hansen',
            phone: '12344321',
            email: 'info@webcontent.dk',
        },
        projectName: 'Produkt Reklamefilm',
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
    ],
})