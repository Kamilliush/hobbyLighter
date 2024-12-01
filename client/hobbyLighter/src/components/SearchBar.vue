<template>
    <div class="search-container">
      <!-- Input Field -->
      <input
        v-model="searchQuery"
        @input="searchHobbies"
        placeholder="Type to search hobbies..."
        class="search-input"
      />
      <!-- Suggestions List -->
      <ul v-if="suggestions.length > 0" class="search-results">
        <li
          v-for="(item, index) in suggestions"
          :key="index"
          @click="selectSuggestion(item)"
          class="search-item"
        >
          <span class="hashtag">#</span> {{ item }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: "SearchBar",
    data() {
      return {
        searchQuery: "",
        suggestions: [], // Stores the filtered suggestions
        allHobbies: [], // All available hobbies fetched from the server
      };
    },
    mounted() {
      // Fetch all hobbies when the component mounts
      this.fetchAllHobbies();
    },
    methods: {
      async fetchAllHobbies() {
        try {
          const response = await fetch("http://172.20.10.4:3000/api/hobbies");
          const data = await response.json();
          this.allHobbies = data.hobbies; // Store hobbies in allHobbies
        } catch (error) {
          console.error("Error fetching hobbies:", error);
        }
      },
      searchHobbies() {
        const query = this.searchQuery.toLowerCase();
        if (query.length > 0) {
          // Filter hobbies based on the query
          this.suggestions = this.allHobbies
            .filter((hobby) => hobby.toLowerCase().includes(query))
            .slice(0, 5); // Show up to 5 suggestions
        } else {
          this.suggestions = []; // Clear suggestions if the query is empty
        }
      },
      selectSuggestion(hobby) {
        this.searchQuery = hobby; // Set the selected hobby in the input field
        this.$emit("hobby-selected", hobby); // Emit the selected hobby to the parent
      },
    },
  };
  </script>
  
  <style scoped>
  .search-container {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background-color: #f5f5f5;
  }
  
  .search-input {
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  
  .search-results {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .search-item {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.2s ease;
  }
  
  .search-item:hover {
    background-color: #e0e0e0;
  }
  
  .hashtag {
    color: orange;
    margin-right: 5px;
  }
  </style>
  