<template>
    <div class="search-bar-container">
      <div class="input-wrapper">
        <input
          type="text"
          v-model="query"
          placeholder="Search..."
          class="search-input"
          @input="onSearch"
        />
      </div>
  
      <ul class="hashtags-list" v-if="filteredHashtags.length">
        <li
          v-for="hashtag in filteredHashtags"
          :key="hashtag"
          class="hashtag-item"
          @click="selectHashtag(hashtag)"
        >
          <span class="hashtag-symbol">#</span> {{ hashtag }}
        </li>
      </ul>
      <p v-else class="no-results">No matching hashtags found.</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed } from "vue";
  
  export default defineComponent({
    name: "SearchBar",
    emits: ["search", "selectHashtag"],
    setup(_, { emit }) {
      const query = ref("");
  
      // Original hashtags
      const originalHashtags = ref(["sport", "art", "paintings", "animals", "dogs"]);
  
      // Shuffled hashtags
      const hashtags = ref(shuffleArray(originalHashtags.value));
  
      const filteredHashtags = computed(() =>
        hashtags.value.filter((hashtag) =>
          hashtag.toLowerCase().includes(query.value.toLowerCase())
        )
      );
  
      const onSearch = () => {
        emit("search", query.value);
      };
  
      const selectHashtag = (hashtag: string) => {
        query.value = hashtag;
        emit("selectHashtag", hashtag);
      };
  
      return {
        query,
        filteredHashtags,
        onSearch,
        selectHashtag,
      };
    },
  });
  
  function shuffleArray(array: string[]) {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }
  </script>
  
  <style scoped>
  .search-bar-container {
    max-width: 400px;
    margin: 20px auto;
    font-family: Arial, sans-serif;
    color: #333;
    text-align: center;
  }
  
  .input-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .search-input {
    width: 70%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px 0 0 4px;
    box-sizing: border-box;
  }
  
  .hashtags-list {
    max-height: 200px;
    list-style: none;
    padding: 0;
    margin: 10px 0 0 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f9f9f9;
    overflow: hidden;
  }
  
  .hashtag-item {
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.2s;
    margin: 5px;
    background-color: #f1f1f1;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .hashtag-item:hover {
    background-color: #e0e0e0;
    transform: scale(1.02);
  }
  
  .hashtag-symbol {
    color: orange;
    margin-right: 5px;
  }
  
  .no-results {
    margin-top: 10px;
    font-size: 14px;
    color: #888;
    text-align: center;
  }
  </style>