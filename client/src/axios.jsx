import axios from 'axios'

const API = axios.create({
    baseURL: "https://taskmaster-gw45.onrender.com",
})

export default API