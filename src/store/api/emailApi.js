import { auth } from "../auth"
import axios from "axios"

export const useEmailAPI = () => {
    // const baseURL = "https://api.wcp.dk/data/email" // Public Prod
    const baseURL = "https://api.nobitches.win/data/email" // Public test
    const baseConfig = { baseURL: baseURL, method: 'get', url: '', headers: { 'Authorization': auth.token } }

    // { userEmail, reportMessage }
    const postReport = (report) => {
        const config = {
            ...baseConfig,
            method: 'post',
            url: '/report',
            data: report,
            headers: { 'Authorization': auth.token } 
        }

        return axios(config)
            .then((res) => { return res })
    }

    return { postReport }
}