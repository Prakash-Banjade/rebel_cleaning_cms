import axiosInstance from "@/config/axios"

export const fetchUsers = async () => {
    const res = await axiosInstance.get('/users');
    return res.data;
}

export const deleteUser = async (id: string) => {
    const res = await axiosInstance.delete(`/users/${id}`);
    return res.data;
}

export const fetchServices = async () => {
    const res = await axiosInstance.get('/services');
    return res.data;
}

export const deleteService = async (id: string) => {
    const res = await axiosInstance.delete(`/services/${id}`);
    return res.data;
}

export const getServiceById = async (id: string) => {
    const res = await axiosInstance.get(`/services/${id}`);
    return res.data;
}

export const fetchBlogs = async () => {
    const res = await axiosInstance.get('/blogs');
    return res.data;
}

export const deleteBlog = async (id: string) => {
    const res = await axiosInstance.delete(`/blogs/${id}`);
    return res.data;
}

export const getBlogById = async (id: string) => {
    const res = await axiosInstance.get(`/blogs/${id}`);
    return res.data;
}



