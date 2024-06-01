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

    login(email, password) {
        return api.login(email, password) // Will return empty string if error / wrong email or password
            .then((data) => { return this.loginHelper(data) })
    },

    loginHelper(token) {
        if (token.length > 0) {
            this.token = "Bearer " + token
            this.isLoggedIn = true
            return api.authenticate().then((data) => this.loggedInUser = data).then(() => {
                localStorage.setItem("user", this.loggedInUser.id)
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

        localStorage.removeItem("user")
        this.eraseCookie("_WCRefreshToken")
    },

    async refreshToken() {
        const id = localStorage.getItem("user")
        
        if (id !== null) {
            api.refreshToken(id).then((data) => {
                this.token = "Bearer " + data
                this.loginHelper(data)
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

    eraseCookie(name) {   
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
})