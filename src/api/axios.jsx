import axios from "axios";

const api = axios.create({
    baseURL: "http://13.124.5.71:8080/api",
    // withCredentials: true,
});

export default api;