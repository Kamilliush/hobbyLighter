<template>
  <div class="search-container">
    <div class="input-container">
      <!-- Pole wyszukiwania -->
      <input
        v-model="searchQuery"
        @input="searchHobbies"
        placeholder="Type to search hobbies..."
        class="search-input"
      />
      <!-- Przycisk powrotu -->
      <button @click="goBack" class="back-button">Back</button>
    </div>
    <!-- Lista sugestii -->
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
      searchQuery: "", // Zapytanie wyszukiwania
      suggestions: [], // Lista filtrowanych sugestii
      allHobbies: [], // Wszystkie hobby z serwera
    };
  },
  mounted() {
    // Pobierz wszystkie hobby, gdy komponent zostanie zamontowany
    this.fetchAllHobbies();
  },
  methods: {
    async fetchAllHobbies() {
      try {
        const response = await fetch("http://localhost:3000/api/hobbies"); // Zmień na odpowiedni URL
        const data = await response.json();
        this.allHobbies = data.hobbies; // Przypisz hobby z odpowiedzi serwera
      } catch (error) {
        console.error("Error fetching hobbies:", error);
      }
    },
    searchHobbies() {
      const query = this.searchQuery.toLowerCase();
      if (query.length > 0) {
        // Filtruj hobby na podstawie zapytania
        this.suggestions = this.allHobbies
          .filter((hobby) => hobby.toLowerCase().includes(query))
          .slice(0, 5); // Wyświetl maksymalnie 5 wyników
      } else {
        this.suggestions = []; // Wyczyść sugestie, jeśli zapytanie jest puste
      }
    },
    selectSuggestion(hobby) {
      this.searchQuery = hobby; // Ustaw wybrane hobby w polu wyszukiwania
      this.$emit("hobby-selected", hobby); // Emituj wybrane hobby do rodzica
    },
    goBack() {
      this.$router.push("/main"); // Przejdź do strony głównej
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

.input-container {
  display: flex;
  align-items: center;
  gap: 10px; /* Odstęp między inputem a przyciskiem */
}

.search-input {
  flex: 1; /* Input zajmuje pozostałą przestrzeń */
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.back-button {
  padding: 10px 15px;
  font-size: 1rem;
  font-weight: bold;
  background-color: orange;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.back-button:hover {
  background-color: darkorange;
}

.search-results {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 10px; /* Odstęp od inputa */
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
