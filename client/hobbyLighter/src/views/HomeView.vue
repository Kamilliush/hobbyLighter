<template>
  <div>
    <h1>Home</h1>
    <SearchBar @search="handleSearch" />
    <p v-if="searchQuery">You searched for: "{{ searchQuery }}"</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SearchBar from './search/SearchBar.vue';

export default defineComponent({
  components: {
    SearchBar,
  },
  setup() {
    const searchQuery = ref('');

    const handleSearch = (query: string) => {
      searchQuery.value = query;
    };

    return {
      searchQuery,
      handleSearch,
    };
  },
});
</script>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 20px;  
}
</style>
