import axiosInstance from "@/config/axios"
import { ContactArraySchema, ContactArrayType } from "@/models/contact.model";
import { Faq, FaqArraySchemaWithBaseModel, FaqArrayWithBaseModel } from "@/models/faq.model";

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

export const fetchGallerys = async () => {
    const res = await axiosInstance.get('/gallery');
    return res.data;
}

export const deleteGallery = async (id: string) => {
    const res = await axiosInstance.delete(`/gallery/${id}`);
    return res.data;
}

export const getGalleryById = async (id: string) => {
    const res = await axiosInstance.get(`/gallery/${id}`);
    return res.data;
}

export async function getContact(): Promise<ContactArrayType | undefined> {
    try {
        const res = await axiosInstance.get(`/contact`);
        const data: ContactArrayType = res.data;

        const parsedData = ContactArraySchema.parse(data);
        return parsedData;
    } catch (e) {
        if (e instanceof Error) console.log(e.stack);
    }
}

export async function getFaqs(): Promise<FaqArrayWithBaseModel | undefined> {
    try {
        const res = await axiosInstance.get(`/faq`);
        const data: FaqArrayWithBaseModel = res.data;

        const parsedData = FaqArraySchemaWithBaseModel.parse(data);
        return parsedData;
    } catch (e) {
        if (e instanceof Error) console.log(e.stack);
    }
}

export const postFaq = async (data: Faq) => {
    try {
        const res = await axiosInstance.post(`/faq`, data);
        return res.data;
    } catch (e) {
        if (e instanceof Error) throw new Error(e.message)
    }
}

export const removeFaq = async (id: string) => {
    try {
        const res = await axiosInstance.delete(`/faq/${id}`);
        return res.data;
    } catch (e) {
        if (e instanceof Error) throw new Error(e.message)
    }
}
export const updateFaq = async (id: string, data: Faq) => {
    try {
        const res = await axiosInstance.patch(`/faq/${id}`, data);
        return res.data;
    } catch (e) {
        if (e instanceof Error) throw new Error(e.message)
    }
}
