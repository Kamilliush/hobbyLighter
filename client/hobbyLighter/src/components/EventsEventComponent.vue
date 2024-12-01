<template>
  <div class="event-panel">
    <h1>Events</h1>
    <div v-for="event in events" :key="event.id" class="event-card">
      <h2 class="line">{{ event.title }}</h2>
      <p class="line"><strong>Location:</strong> {{ event.location }}</p>
      <p class="line"><strong>Categories:</strong> {{ event.categories.join(', ') }}</p>
      <p class="line"><strong>Description:</strong> {{ event.description }}</p>
      <p class="line">
        <strong>Participants:</strong> {{ event.participants.length }} / {{ event.maxParticipants }}
      </p>
      <button 
        :disabled="isJoined(event) || event.participants.length >= event.maxParticipants" 
        @click="joinEvent(event)"
      >
        {{ isJoined(event) ? 'Joined' : 'Join' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventChallenges",
  data() {
    return {
      events: [
        {
          id: 1,
          title: "Frontend Workshops",
          location: "Warsaw",
          categories: ["Technology", "Education"],
          description: "Learn the basics of frontend development, including HTML, CSS, and JavaScript.",
          participants: ["John", "Anna"],
          maxParticipants: 5,
        },
        {
          id: 2,
          title: "Networking Meetup",
          location: "Krakow",
          categories: ["Business", "Networking"],
          description: "Expand your professional network and meet like-minded individuals in the business world.",
          participants: ["Mark"],
          maxParticipants: 10,
        },
        {
          id: 3,
          title: "IT Conference",
          location: "Online",
          categories: ["Technology"],
          description: "A global online conference discussing the latest trends in the IT industry.",
          participants: [],
          maxParticipants: 50,
        },
      ],
      userName: localStorage.getItem("username") || "Your Name", // Fetch username from local storage
    };
  },
  methods: {
    async joinEvent(event) {
      if (!this.isJoined(event) && event.participants.length < event.maxParticipants) {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch("http://172.20.10.4:3000/api/events/join", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ eventId: event.id }),
          });

          if (response.ok) {
            event.participants.push(this.userName); // Update UI locally
            console.log("Event joined successfully!");
          } else {
            const errorData = await response.json();
            console.error("Error joining event:", errorData.message);
          }
        } catch (error) {
          console.error("Error joining event:", error);
        }
      }
    },
    isJoined(event) {
      return event.participants.includes(this.userName);
    },
  },
};
</script>

<style scoped>
.event-panel {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.event-card {
  margin-bottom: 20px;
  padding: 15px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
h2 {
  margin: 0 0 10px;
  font-size: 25px;
}

h1 {
  margin-bottom: 5%;
}
button {
  padding: 8px 12px;
  margin-top: 5%;
  background-color: #14213D;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.line {
  margin-top: 2%;
}
</style>
