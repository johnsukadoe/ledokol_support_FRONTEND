import apiClient from "@/services/apiClient.ts";
import type { ITier } from "@/types/ITier.ts";

export const createTier = async (formData: ITier) => {
  try {
    const { data } = await apiClient.post(`tier/`, formData);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getTiers = async (creatorId: number) => {
  try {
    const { data } = await apiClient.get(`tier/`, {
      params: {
        creatorId,
      },
    });
    return data;
  } catch (e) {
    console.log(e);
  }
};
