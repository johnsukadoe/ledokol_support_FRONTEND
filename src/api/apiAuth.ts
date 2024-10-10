import apiClient from "@/services/apiClient.ts";
import type { ILoginUser, IRegisterUser } from "@/types/registerUser.ts";

export const register = async (payload: IRegisterUser) => {
  try {
    const { data } = await apiClient.post(`auth/register`, payload);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const login = async (payload: ILoginUser) => {
  try {
    console.log("trying");
    const { data } = await apiClient.post(`auth/login`, payload);
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};
export const logout = async () => {
  try {
    const { data } = await apiClient.post(`auth/logout`);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const profile = async () => {
  try {
    const { data } = await apiClient.post(`auth/profile`);
    return data;
  } catch (e) {
    return false;
  }
};

export const test = async () => {
  const { data } = await apiClient.post(`auth/test`);
  return data;
};
