import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:5000/api/",
    timeout: 15000,
})

export default api