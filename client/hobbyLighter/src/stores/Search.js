import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', {
  state: () => ({
    searches: JSON.parse(localStorage.getItem('searches')) || [],
  }),
  actions: {
    addSearch(search) {
      if (!this.searches.includes(search.trim())) {
        this.searches.push(search.trim());
        localStorage.setItem('searches', JSON.stringify(this.searches));
      }
    },
    clearSearches() {
      this.searches = [];
      localStorage.removeItem('searches');
    },
  },
});
