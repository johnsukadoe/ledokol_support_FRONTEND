import apiClient from "@/services/apiClient.ts";
import type { ILoginUser, IRegisterUser } from "@/types/registerUser.ts";

const localServer = "http://localhost:3000/api/";

export const register = async (payload: IRegisterUser) => {
  try {
    const { data } = await apiClient.post(
      `${localServer}auth/register`,
      payload,
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const login = async (payload: ILoginUser) => {
  try {
    const { data } = await apiClient.post(`${localServer}auth/login`, payload);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const test = async () => {
  const { data } = await apiClient.post(`${localServer}auth/test`);
  return data;
};