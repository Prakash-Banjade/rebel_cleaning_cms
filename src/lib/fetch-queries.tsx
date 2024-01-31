import axiosInstance from "@/config/axios"

export const fetchUsers = async () => {
    const res = await axiosInstance.get('/users');
    return res.data;
}