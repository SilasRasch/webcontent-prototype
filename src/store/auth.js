import { reactive } from "vue";

export const auth = reactive({
    isLoggedIn: false,
    loggedInUser: {
        id: undefined,
        email: undefined,
        role: undefined
    },
    login(email) {
        this.isLoggedIn = true
        this.loggedInUser = {
            ...this.loggedInUser,
            id: 1,
            email: email,
            role: 'Bruger',
        }
    },
    logOut() {
        this.isLoggedIn = false
        this.loggedInUser =  {
            email: undefined,
            role: undefined,
        }
    },
    isAdmin() {
        return this.loggedInUser.role === "Admin" ? true : false
    },
    isUser() {
        return this.loggedInUser.role === "Bruger" ? true : false
    },
    isCreator() {
        return this.loggedInUser.role === "Creator" ? true : false
    },
})