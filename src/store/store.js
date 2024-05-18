import { reactive } from "vue";
// import { mockOrders } from "./mockData";
import { orderApi } from "./api/orderApi";

export const store = reactive({
    currOrderPage: 0,
    currDashboardTab: 1,
    showLoginModal: false,
    orders: [],
    sourceArr: [],
    channelsArr: [],
    formatArr: [],
    newOrder: {
        id: 0,
        brand: '', // * Required
        cvr: '', // * Required
        contact: { 
            name: '', // * Required
            phone: '', // * Required
            email: '', // * Required
        },
        projectName: '', // * Required
        projectType: '', // * Required
        contentCount: 5,
        contentLength: 60,
        channels: '', // * Required
        format: '', // * Required
        extraCreator: false,
        extraHook: false,
        extraHookCount: 1,
        extraNotes: '',
        notes: '', // * Required
        source: '', 
        price: 0,
        deliveryTimeFrom: 0,
        deliveryTimeTo: 0,
        userId: 0,
        status: {
            category: 0,
            state: 0
        },
    },

    addOrder(order) {
        orderApi.postOrder(order)

        // Reset newOrder
        this.newOrder = {
            id: 0,
            brand: '', // * Required
            cvr: '', // * Required
            contact: { 
                name: '', // * Required
                phone: '', // * Required
                email: '', // * Required
            },
            projectName: '', // * Required
            projectType: '', // * Required
            contentCount: 5,
            contentLength: 60,
            channels: '', // * Required
            format: '', // * Required
            extraCreator: false,
            extraHook: false,
            extraHookCount: 1,
            extraNotes: '',
            notes: '', // * Required
            source: '', 
            price: 0,
            deliveryTimeFrom: 0,
            deliveryTimeTo: 0,
            userId: 0,
            status: {
                category: 0,
                state: 0
            },
        }

        this.formatArr = []
        this.sourceArr = []
        this.channelsArr = []
    },

    confirmOrder(id, price, deliveryfrom, deliveryTo) {
        var order = this.orders.find((order) => order.id === id)
        order = {
            ...order,
            status: {
                category: 1,
                state: 1,
            },
            price: price,
            deliveryTimeFrom: parseInt(deliveryfrom),
            deliveryTimeTo: parseInt(deliveryTo),
        }
        orderApi.putOrder(id, order)
    },

    toggleLoginModal() {
        this.showLoginModal = !this.showLoginModal
    },

    // Check if input strings are empty
    validate() {
        if (this.newOrder.brand === '' || this.newOrder.cvr === '' || this.newOrder.contact.name === '' || 
            this.newOrder.contact.phone === '' || this.newOrder.contact.email === '' || this.newOrder.projectName === '' || 
            this.newOrder.projectType === '' || this.newOrder.channels === '' || this.newOrder.format === '' || this.newOrder.notes === '') 
            {
                return false
            }
        
        return true
    }
})