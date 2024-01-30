import axios from "axios";
import cookie from 'js-cookie'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_URL,
});

axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + cookie.get('access_token');
axiosInstance.interceptors.request.use(
    async (config: any) => {
        config.headers = {
            Authorization: `Bearer ` + cookie.get('access_token'),
        };
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance