import axios from "axios";
const server = 'http://localhost:3001/';

export const getPosts = async ()=> {
    const {data} = await axios.get(server+'posts');
    return data;
};
