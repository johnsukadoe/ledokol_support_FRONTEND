import axios from "axios";
const server = 'http://localhost:3001/';

export const createPost = async (post) => {
    try {
        const response = await axios.post(`${server}posts`, {
            ...post,
        });

        // Возвращаем данные, которые вернул сервер после создания поста
        return response.data;
    } catch (error) {
        // Если есть ошибка, обрабатываем ее здесь
        console.error('Error creating post:', error);
        throw error; // Можно выбросить ошибку для обработки в вызывающем коде
    }
};