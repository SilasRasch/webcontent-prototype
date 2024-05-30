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
            // localStorage.setItem("token", token)
            this.setCookie("token", token, 1)
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

        localStorage.removeItem("token")
        this.eraseCookie("token")
    },

    async checkOldSession() {
        // const token = localStorage.getItem("token")
        const token = this.getCookie("token")
        
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
    },

    setCookie(name, value, days) {
        var expires = ''
        var date = new Date()
        date.setTime(date.getTime() + (days*24*60*60*1000))
        expires = "; expires=" + date.toUTCString()

        document.cookie = name + "=" + (value || "") + expires + "; path=/; httpOnly; SameSite=strict"
    },

    getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
    },

    eraseCookie(name) {   
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
})