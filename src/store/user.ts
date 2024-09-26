import { defineStore } from "pinia";

interface User {
  created_at: string;
  creater: Record<string, any>;
  email: string;
  id: number;
  role: string;
  updated_at: string;
  username: string;
}

const useUserStore = defineStore("user", {
  state: () => ({
    user: {} as User,
  }),
  actions: {
    updateUser(updatedUser: User) {
      this.user = { ...updatedUser };
    },
  },
  persist: true,
});

export default useUserStore;
