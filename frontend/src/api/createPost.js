import axios from "axios";
const server = 'https://ems-app.kz/ledokol-api/';

const localServer= 'http://localhost:3001/'

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