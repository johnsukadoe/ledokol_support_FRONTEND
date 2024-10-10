import apiClient from "@/services/apiClient.ts";

export const createPost = async (formData) => {
  try {
    const data = await apiClient.post(`post/`, formData, {
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
