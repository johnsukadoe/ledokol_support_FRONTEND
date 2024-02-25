import axios from "axios";
const server = 'https://ems-app.kz/ledokol-api/';

export const getPosts = async ()=> {
    const {data} = await axios.get(server+'posts');
    return data;
};
