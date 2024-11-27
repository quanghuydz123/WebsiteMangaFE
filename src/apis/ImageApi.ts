import axios from 'axios';
import { Base, ImageData } from '../constrants/apiResponse';
import { API_BASE_URL } from './apiService';

async function read(chapterId: string): Promise<Base<ImageData>> {
    if (!chapterId) {
        throw new Error("Chapter ID is required to fetch images.");
    }

    const url = `${API_BASE_URL}/chapters/read?chapterId=${chapterId}`;
    
    try {
        const response = await axios.get<Base<ImageData>>(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching images:", error);
        throw error;
    }
}

async function append(chapterId: string, imageLink: string): Promise<Base<any>> {
    if (!chapterId) {
        throw new Error("Chapter ID is required to fetch images.");
    }

    const url = `${API_BASE_URL}/chapters/appendImageLink`;
    
    try {
        const response = await axios.post<Base<any>>(url,
            {
                chapterId: chapterId,
                imageLinks: imageLink,
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching images:", error);
        throw error;
    }
}
async function deleteImage(chapterId: string, pos: number): Promise<Base<any>> {
    if (!chapterId) {
        throw new Error("Chapter ID is required to fetch images.");
    }

    const url = `${API_BASE_URL}/chapters/removeImageLink`;
    
    try {
        const response = await axios.post<Base<any>>(url,
            {
                chapterId: chapterId,
                pos: pos,
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching images:", error);
        throw error;
    }
}
async function insert(chapterId: string, imageLink: string, pos: number): Promise<Base<any>> {
    if (!chapterId) {
        throw new Error("Chapter ID is required to fetch images.");
    }

    const url = `${API_BASE_URL}/chapters/insertImageLink`;
    
    try {
        const response = await axios.post<Base<any>>(url,
            {
                chapterId: chapterId,
                imageLinks: imageLink,
                pos: pos
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching images:", error);
        throw error;
    }
}

export default {
    read,
    append,
    deleteImage,
    insert
};
