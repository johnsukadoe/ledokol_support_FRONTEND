import axios from "axios";

const server = "https://ems-app.kz/ledokol-api/";

const localServer = "http://localhost:3001/";

export const getPosts = async (filters: object) => {
  let params = filters;
  const { data } = await axios.get(localServer + "posts", { params });
  return data;
};

export const removePost = async (post_id: number) => {
  const data = await axios.post(localServer + "post/remove", {
    query: {
      post_id,
    },
  });
  return data;
};

export const editPost = async (post: object) => {
  const data = await axios.put(localServer + "post", {
    ...post,
  });
  return data;
};

export const likePost = async (postId: number, likerId: number) => {
  const data = await axios.post(localServer + "post/like", {
    params: {
      postId,
      likerId,
    },
  });
  return data;
};

export const unlikePost = async (postId: number, likerId: number) => {
  const data = await axios.post(localServer + "post/unlike", {
    params: {
      postId,
      likerId,
    },
  });
  return data;
};

export const commentPost = async (
  comment: string,
  postId: number,
  userId: number,
  parentId: number
) => {
  const data = await axios.post(localServer + "post/comment", {
    params: {
      postId,
      comment,
      userId,
      parentId,
    },
  });
  return data;
};

export const editComment = async (
  commentId: number,
  newText: string,
  parentId: number
) => {
  const data = await axios.put(localServer + "post/comment/edit", {
    params: {
      commentId,
      newText,
      parentId,
    },
  });
  return data;
};

export const removeComment = async (commentId: number, parentId: number) => {
  const data = await axios.delete(localServer + "post/comment", {
    params: {
      commentId,
      parentId,
    },
  });
  return data;
};

export const createPost = async (post: object) => {
  try {
    const response = await axios.post(`${localServer}posts`, {
      ...post,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};
