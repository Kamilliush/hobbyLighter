<template>
  <div class="hobby-selection-container">
    <div class="popup">
      <h2>What's your vibe today and your passion tomorrow? Share your hobbies with us!</h2>
      <div class="hobby-input-container">
        <input
          type="text"
          v-model="searchQuery"
          @input="searchHobbies"
          placeholder="Type to search hobbies..."
          class="input-field"
        />
        <ul v-if="suggestions.length > 0" class="suggestions-list">
          <li
            v-for="(hobby, index) in suggestions"
            :key="index"
            @click="addHobby(hobby)"
          >
            {{ hobby }}
          </li>
        </ul>
      </div>
      <div class="selected-hobbies">
        <p>Selected Hobbies ({{ selectedHobbies.length }}/5):</p>
        <div class="hobbies-list">
          <span v-for="(hobby, index) in selectedHobbies" :key="index" class="hobby-item">
            {{ hobby }}
            <button @click="removeHobby(index)">x</button>
          </span>
        </div>
      </div>
      <button
        :disabled="selectedHobbies.length < 5"
        @click="submitHobbies"
        class="auth-button"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HobbySelection",
  data() {
    return {
      searchQuery: "",
      suggestions: [],
      selectedHobbies: [],
      allHobbies: [],
    };
  },
  mounted() {
    this.fetchAllHobbies();
  },
  methods: {
    async fetchAllHobbies() {
      try {
        const response = await fetch("http://172.20.10.4:3000/api/hobbies");
        const data = await response.json();
        this.allHobbies = data.hobbies;
      } catch (error) {
        console.error("Error fetching hobbies:", error);
      }
    },
    searchHobbies() {
      const query = this.searchQuery.toLowerCase();
      if (query.length > 0) {
        this.suggestions = this.allHobbies
          .filter(
            (hobby) =>
              hobby.toLowerCase().includes(query) &&
              !this.selectedHobbies.includes(hobby)
          )
          .slice(0, 5);
      } else {
        this.suggestions = [];
      }
    },
    addHobby(hobby) {
      if (this.selectedHobbies.length < 5 && !this.selectedHobbies.includes(hobby)) {
        this.selectedHobbies.push(hobby);
      }
      this.searchQuery = "";
      this.suggestions = [];
    },
    removeHobby(index) {
      this.selectedHobbies.splice(index, 1);
    },
    async submitHobbies() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://172.20.10.4:3000/api/users/hobbies", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ hobbies: this.selectedHobbies }),
        });
        if (response.ok) {
          alert("Hobbies saved successfully!");
          this.$router.push("/signin");
        } else {
          const errorData = await response.json();
          console.error("Error saving hobbies:", errorData.message);
        }
      } catch (error) {
        console.error("Error submitting hobbies:", error);
      }
    },
  },
};
</script>

<style scoped>
.hobby-selection-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  background-color: white;
  width: 90%;
  max-width: 500px;
  padding: 20px;
  border-radius: 10px;
}

.hobby-input-container {
  position: relative;
}

.input-field {
  width: 100%;
  padding: 18px;
  font-size: 1.3rem;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
}

.suggestions-list {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  z-index: 10;
  list-style: none;
  padding: 0;
  margin: 0;
}

.suggestions-list li {
  padding: 10px;
  cursor: pointer;
}

.suggestions-list li:hover {
  background-color: #f0f0f0;
}

.selected-hobbies {
  margin-top: 20px;
}

.hobbies-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.hobby-item {
  background-color: #e0e0e0;
  padding: 5px 10px;
  border-radius: 15px;
  display: flex;
  align-items: center;
}

.hobby-item button {
  background: none;
  border: none;
  margin-left: 5px;
  cursor: pointer;
}

.auth-button {
  margin-top: 20px;
  padding: 18px;
  width: 100%;
  font-size: 1.3rem;
  font-weight: bold;
  background-color: orange;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.auth-button:disabled {
  background-color: grey;
  cursor: not-allowed;
}
</style>
