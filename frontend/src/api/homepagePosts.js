import axios from "axios";
const server = 'https://ems-app.kz/ledokol-api/';

const localServer= 'http://localhost:3001/';

export const getPosts = async filters=> {
    let params= filters
    const {data} = await axios.get(server+'posts', {params});
    return data;
};
