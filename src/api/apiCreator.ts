import apiClient from "@/services/apiClient.ts";
import type { ICreator } from "@/types/ICreator.ts";

export const createCreator = async (payload: ICreator) => {
  try {
    const { data } = await apiClient.post(`creator/`, payload);
    return data;
  } catch (e) {
    console.log(e);
  }
};
