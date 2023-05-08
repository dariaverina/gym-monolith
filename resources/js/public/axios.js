import axios from "axios";

const axiosClient = axios.create({
    baseURL: `http://127.0.0.1:8000/api`
})

axiosClient.interceptors.request.use((config) =>{
    const token = localStorage.getItem('TOKEN');
    config.headers.Authorization =`Bearer ${token}`;
    return config;
});

axiosClient.interceptors.response.use(response => {
    return response;
}, error =>{
    if (error.response && error.response.status === 401){
        return error
    }
    throw error;
})

export default axiosClient;