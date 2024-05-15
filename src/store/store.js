import { reactive } from "vue";
import { mockOrders } from "./mockData";

export const store = reactive({
    currOrderPage: 0,
    currDashboardTab: 1,
    showLoginModal: false,
    orders: mockOrders,
    mockId: 1000,
    newOrder: {
        orderId: 0,
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
        isConfirmed: false, 
        isDenied: false,
        isComplete: false,
        status: 0,
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
            source: '',
            price: 0,
            deliveryTimeFrom: 0,
            deliveryTimeTo: 0,
            isConfirmed: false,
            isDenied: false,
            isComplete: false,
            status: 0,
            sourceArr: [],
            channelsArr: [],
            formatArr: [],
        }
    },

    confirmOrder(id, price, deliveryfrom, deliveryTo) {
        const index = this.orders.findIndex((order) => order.orderId === id)
        this.orders[index].isConfirmed = true
        this.orders[index].price = price
        this.orders[index].deliveryTimeFrom = parseInt(deliveryfrom)
        this.orders[index].deliveryTimeTo = parseInt(deliveryTo)
        this.orders[index].status = 1
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