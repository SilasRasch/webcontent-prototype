import { reactive } from "vue";
import { useAuthAPI } from "./api/authApi";

const api = useAuthAPI()

export const auth = reactive({
    token: null,
    isLoggedIn: false,
    loggedInUser: {
        id: undefined,
        email: undefined,
        displayName: undefined,
        phone: undefined,
        roles: []
    },
    originalRole: '',
    
    login(email, password) {
        return api.login(email, password) // Will return empty string if error / wrong email or password
            .then((data) => { return this.loginHelper(data) })
    },

    loginHelper(token) {
        if (token.length > 0) {
            this.token = "Bearer " + token
            this.isLoggedIn = true
            return api.authenticate()
            .then((data) => this.loggedInUser = data).then((data) => {
                this.originalRole = data.roles[0]
                localStorage.setItem("user", this.loggedInUser.email)
                return true
            })
            .catch(() => this.resetAuth())
        }
        return false
    },

    logOut() {
        api.revoke().then(() => {
            this.resetAuth()
        })
        
    },

    resetAuth() {
        this.isLoggedIn = false
        this.loggedInUser =  {
            id: undefined,
            email: undefined,
            displayName: undefined,
            roles: [],
        }
        this.token = undefined
        localStorage.removeItem("user")
    },

    async refreshToken() {
        const user = localStorage.getItem("user")
        
        if (user !== null) {
            return api.refreshToken(user).then((data) => {
                this.token = "Bearer " + data
                this.loginHelper(data)
                return true
            }).catch(() => this.logOut())
        }
    },

    isAdmin() {
        return this.loggedInUser.roles.includes("Admin")  ? true : false
    },
    isUser() {
        return this.loggedInUser.roles.includes("Bruger") ? true : false
    },
    isCreator() {
        return this.loggedInUser.roles.includes("Creator") ? true : false
    },

    decodeJwt(token) {
        const arrayToken = token.split(".")
        return JSON.parse(atob(arrayToken[1]))
    },
})