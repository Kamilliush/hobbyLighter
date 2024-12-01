import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    username: localStorage.getItem('username') || null,
  }),
  actions: {
    setUsername(username) {
      this.username = username;
      localStorage.setItem('username', username);
    },
    clearUser() {
      this.username = null;
      localStorage.removeItem('username');
    },
  },
});
