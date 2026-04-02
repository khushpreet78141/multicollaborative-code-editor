import axios from "axios";


const axiosClient = axios.create({
    baseURL: "http://localhost:3000/api", //  backend URL
    withCredentials: true, // IMPORTANT for cookies ( JWT case)
    headers: {
        "Content-Type": "application/json"
    }
});


export default axiosClient;


