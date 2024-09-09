import useMainStore from "@/store";
import axios from "axios";
import { createPinia } from "pinia";

const pinia = createPinia();
const main = useMainStore(pinia);

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Добавьте интерцептор для обработки ошибок
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      main.changeLogin(false);
      console.log(main.isLoggedIn);
      window.location.href = "/";
    }
    return Promise.reject(error);
  },
);

export default apiClient;
