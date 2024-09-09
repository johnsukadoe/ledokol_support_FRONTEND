import { defineStore } from "pinia";

const useMainStore = defineStore("main", {
  state: () => {
    return {
      isLoggedIn: false,
    };
  },
  actions: {
    hydrate() {
      // Получите состояние из локального хранилища или API
      const savedState = localStorage.getItem("isLoggedIn");
      this.isLoggedIn = !!savedState;
    },
    changeLogin(status: boolean) {
      this.isLoggedIn = status;
      localStorage.setItem("isLoggedIn", JSON.stringify(status));
    },
  },
});
export default useMainStore;
