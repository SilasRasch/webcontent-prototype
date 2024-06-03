import { reactive } from "vue";
import { useOrderAPI } from "./api/orderApi";

const orderAPI = useOrderAPI()

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

    orderTemplate: {
        id: 0,
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
        userId: 0,
        status: {
            category: 0,
            state: 0
        },
    },

    addOrder(order) {
        orderAPI.postOrder(order)

        // Reset
        this.newOrder = this.orderTemplate
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
            scripts: []
        }

        // Generate scripts
        for (let i = 0; i < order.contentCount; i++) {
            order.scripts.push({ name: `Script ${i + 1}`, link: ''})
        }

        orderAPI.putOrder(id, order)
    },

    handleStatusChange(order, newCategory) {
        if (newCategory <= 4) { // Confirmed
            order.status.category = newCategory
            order.status.state = 1
        } 
        else if (newCategory === 5) { // Completed
            order.status.category = 0
            order.status.state = 2
        } 
        else if (newCategory === 6) { // Cancelled
            order.status.cateogry = 0
            order.status.state = -1
        }
    
        // Put new status
        orderAPI.putOrder(order.id, order)
    },

    updateScript(orderId, scriptIndex, name, link) {
        var order = this.orders.find((order) => order.id === orderId)

        order.scripts[scriptIndex] = { name: name, link: link}

        orderAPI.putOrder(orderId, order)
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