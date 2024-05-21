import { reactive } from "vue";
import { useAuthAPI } from "./api/authApi";

const api = useAuthAPI()

export const auth = reactive({
    token: null,
    isLoggedIn: false,
    loggedInUser: {
        id: undefined,
        email: undefined,
        roles: []
    },

    async login(email, password) {
        api.login(email, password) // Will return empty string if error / wrong email or password
            .then(async (data) => { return this.loginHelper(data)})
    },

    async loginHelper(token) {
        if (token.length > 0) {
            localStorage.setItem("token", token)
            this.token = "Bearer " + token
            this.isLoggedIn = true
            api.authenticate().then((data) => this.loggedInUser = data).then(() => {
                return true
            })
        }
        return false
    },

    logOut() {
        this.isLoggedIn = false
        this.loggedInUser =  {
            id: undefined,
            email: undefined,
            roles: [],
        }

        localStorage.removeItem("token")
    },

    async checkOldSession() {
        const token = localStorage.getItem("token")
        
        if (token != null) {
            const decoded = auth.decodeJwt(token)
            if (decoded.exp * 1000 > Date.now()) {
                this.loginHelper(token)
            }
            else {
                this.logOut()
            }
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
    }
})