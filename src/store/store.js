import { reactive } from "vue";
import { useOrderAPI } from "./api/orderApi";
import { auth } from "./auth";
import { validateOrder } from "./validation";

const orderAPI = useOrderAPI()

export const store = reactive({
    currOrderPage: 0,
    currDashboardTab: 1,
    extraHookEnabled: false,
    orders: [],
    sourceArr: [],
    channelsArr: [],
    formatArr: [],
    orderDataBase: {
        id: 0,
        userId: 0,
        status: {
            category: 0,
            state: 0
        },
        price: 0,
        deliveryTimeFrom: 2,
        deliveryTimeTo: 3,
    },
    orderDataPageOne: {
        brand: {
            name: '',
            url: '',
        },
        contact: {
            name: auth.loggedInUser.displayName ? auth.loggedInUser.displayName : '',
            phone: auth.loggedInUser.phone ? auth.loggedInUser.phone : '',
            email: auth.loggedInUser.email ? auth.loggedInUser.email : '',
        }
    },
    orderDataPageTwo: {
        projectName: '',
        projectType: '',
        format: '',
        platforms: '',
        contentCount: 5,
        contentLength: 60,
    },
    orderDataPageThree: {
        products: [],
        creatorDescription: '',
        focusPoints: '',
        ideas: [],
        extraNotes: '',
        relevantFiles: '',
        extraCreator: false,
        extraHook: 1,
    },

    orderDataBaseTemplate: {
        id: 0,
        userId: 0,
        status: {
            category: 0,
            state: 0
        },
        price: 0,
        deliveryTimeFrom: 2,
        deliveryTimeTo: 3,
    },
    orderDataPageOneTemplate: {
        brand: {
            name: '',
            url: '',
        },
        contact: {
            name: auth.loggedInUser.displayName ? auth.loggedInUser.displayName : '',
            phone: auth.loggedInUser.phone ? auth.loggedInUser.phone : '',
            email: auth.loggedInUser.email ? auth.loggedInUser.email : '',
        }
    },
    orderDataPageTwoTemplate: {
        projectName: '',
        projectType: '',
        format: '',
        platforms: '',
        contentCount: 5,
        contentLength: 60,
    },
    orderDataPageThreeTemplate: {
        products: [],
        creatorDescription: '',
        focusPoints: '',
        ideas: [],
        extraNotes: '',
        relevantFiles: '',
        extraCreator: false,
        extraHook: 1,
    },

    addOrder(order) {
        if (validateOrder(order)) {
            let cleanedOrder = Object.entries(order).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})
            // console.log(cleanedOrder);
            return orderAPI.postOrder(cleanedOrder).then(() => {
                // Reset
                this.orderDataBase = JSON.parse(JSON.stringify(this.orderDataBaseTemplate))
                this.orderDataPageOne = JSON.parse(JSON.stringify(this.orderDataPageOneTemplate))
                this.orderDataPageTwo = JSON.parse(JSON.stringify(this.orderDataPageTwoTemplate))
                this.orderDataPageThree = JSON.parse(JSON.stringify(this.orderDataPageThreeTemplate))
                this.formatArr = []
                this.sourceArr = []
                this.channelsArr = []
                this.extraHookEnabled = false
            }).finally(() => { return true })
        }
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
            links: {
                scripts: '',
                content: '',
                other: ''
            },
            creators: [],
        }

        return orderAPI.putOrder(id, order).then((data) => { return data })
    },

    rejectOrder(id) {
        var order = this.orders.find((order) => order.id === id)

        order = {
            ...order,
            status: {
                category: 0,
                state: -1,
            }
        }

        return orderAPI.putOrder(id, order).then((res) => {return res})
    },

    handleStatusChange(order, newCategory) {
        if (newCategory <= 4) { // Confirmed
            order.status.category = newCategory
            order.status.state = 1
        } 
        else if (newCategory === 5) { // Completed
            order.status.category = 4
            order.status.state = 2
        } 
        else if (newCategory === 6) { // Cancelled
            order.status.cateogry = 0
            order.status.state = -1
        }
    
        return orderAPI.putOrder(order.id, order).then((res) => {return res})
    },

    updateScript(orderId, scriptIndex, name, link) {
        var order = this.orders.find((order) => order.id === orderId)

        order.scripts[scriptIndex] = { name: name, link: link}

        orderAPI.putOrder(orderId, order)
    },

    updateLink(orderId, linkName, link) {
        var order = this.orders.find((order) => order.id === orderId)

        if (linkName === 'Scripts') {
            order.links.scripts = link
        } 
        else if (linkName === 'Content') {
            order.links.content = link
        } 
        else if (linkName === 'Other') {
            order.links.other = link
        } 

        orderAPI.putOrder(orderId, order)
    },

    cleanObject(obj) {
        return Object.entries(obj).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})
    },

    // Check if input strings are empty
    validate() {
        if (this.orderDataPageOne.brand.name === '' || this.orderDataPageOne.brand.url === '' || this.orderDataPageOne.contact.name === '' || 
            this.orderDataPageOne.contact.phone === '' || this.orderDataPageOne.contact.email === '' || this.orderDataPageTwo.projectName === '' || 
            this.orderDataPageTwo.projectType === '' || this.orderDataPageTwo.platforms === '' || this.orderDataPageTwo.format === '') 
            {
                return false
            }
        
        return true
    },

    showPageThree() {
        if ((this.orderDataPageThree.products !== '' || this.orderDataPageThree.creatorDescription !== '' || this.orderDataPageThree.focusPoints !== '' || 
            this.orderDataPageThree.ideas !== '' || this.orderDataPageThree.extraNotes !== '' || this.orderDataPageThree.relevantFiles !== '') && this.showExtras()) 
            {
                return true
            }

        return false
    },

    isVideo() {
        if (store.orderDataPageTwo.projectType !== 'Statics' && store.orderDataPageTwo.projectType !== 'Stilbilleder' && store.orderDataPageTwo.projectType !== '') {
            return true
        }
        return false
    },

    showExtras() {
        if (store.orderDataPageTwo.projectType === 'User Generated Content' || store.orderDataPageTwo.projectType === 'Testimonials') {
            return true
        }
        return false
    }
})