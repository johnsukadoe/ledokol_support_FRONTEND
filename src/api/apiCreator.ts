import apiClient from "@/services/apiClient.ts";
import type { ICreator } from "@/types/ICreator.ts";

const localServer = "http://localhost:3000/api/";

export const createCreator = async (payload: ICreator) => {
  try {
    const { data } = await apiClient.post(`${localServer}creator/`, payload);
    return data;
  } catch (e) {
    console.log(e);
  }
};
