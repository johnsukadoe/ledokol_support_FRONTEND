import axios from "axios";
const server = 'http://localhost:3001/';

export const createPost = async (post) => {
    try {
        const response = await axios.post(`${server}posts`, {
            ...post,
        });

        return response.data;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};