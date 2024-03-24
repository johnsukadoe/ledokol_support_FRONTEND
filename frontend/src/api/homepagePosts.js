import axios from "axios";
const server = 'https://ems-app.kz/ledokol-api/';

const localServer= 'http://localhost:3001/';

export const getPosts = async filters=> {
    let params= filters
    const {data} = await axios.get(localServer+'posts', {params});
    return data;
};

export const removePost = async post_id=> {
    const data = await axios.post(localServer+'post/remove', {
        query:{
            post_id
        }
    });
    return data;
};

export const editPost = async (post)=> {
    const data = await axios.put(localServer+'post', {
        ...post
    });
    return data;
};

