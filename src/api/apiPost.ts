import apiClient from "@/services/apiClient.ts";

const localServer = "http://localhost:3000/api/";

export const createPost = async (formData) => {
  try {
    const data = await apiClient.post(`${localServer}post/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};
