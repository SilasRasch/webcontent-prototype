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
        await api.login(email, password)
            .then((data) => {
                this.token = "Bearer " + data
                localStorage.setItem("token", data)
            })
            .then(async () => {
                this.isLoggedIn = true
                this.loggedInUser = await api.authenticate()
            })
        console.log(this.loggedInUser);
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

    async getOldSession() {
        const token = localStorage.getItem("token")
        
        if (token != null) {
            const decoded = auth.decodeJwt(token)
            if (decoded.exp * 1000 > Date.now()) {
                this.token = "Bearer " + token
                this.isLoggedIn = true
                this.loggedInUser = await api.authenticate()
            }
            else {
                this.logOut()
            }
        }

        console.log(this.loggedInUser);
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

    decodeJwt: (token) => {
        const arrayToken = token.split(".")
        return JSON.parse(atob(arrayToken[1]))
    }
})