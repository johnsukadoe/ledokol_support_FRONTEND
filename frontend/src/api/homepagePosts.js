import axios from 'axios'

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


export const likePost  = async (postId, likerId) =>{
    const data = await axios.post(localServer+'post/like', {
        params:{
            postId, likerId
        }
    })
    return data
}

export const unlikePost  = async (postId, likerId) =>{
    const data = await axios.post(localServer+'post/unlike', {
        params:{
            postId, likerId
        }
    })
    return data
}

export const commentPost  = async (comment, postId, userId, parentId) =>{
    const data = await axios.post(localServer+'post/comment', {
        params:{
            postId, comment, userId, parentId
        }
    })
    return data
}

export const editComment  = async (commentId, newText, parentId) =>{
    const data = await axios.put(localServer+'post/comment/edit', {
        params:{
            commentId, newText, parentId
        }
    })
    return data
}

export const removeComment  = async (commentId, parentId) =>{
    const data = await axios.delete(localServer+'post/comment', {
        params:{
            commentId, parentId
        }
    })
    return data
}